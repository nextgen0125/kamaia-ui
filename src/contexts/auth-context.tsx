"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  LoginCredentials, 
  AuthContextType 
} from '../interfaces/IAuth';
import { IUser } from '@/interfaces/IUser';
import authService from '@/services/auth-service';

/**
 * Estados do contexto de autenticação
 */
interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Ações do reducer de autenticação
 */
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: IUser }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_UPDATE_USER'; payload: Partial<IUser> }
  | { type: 'AUTH_CLEAR_ERROR' };

/**
 * Estado inicial do contexto
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/**
 * Reducer para gerenciar estado de autenticação
 */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

/**
 * Contexto de autenticação
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props do provider de autenticação
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider do contexto de autenticação
 * Gerencia estado global de autenticação e fornece métodos para login/logout
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Verifica se o usuário está autenticado ao carregar a aplicação
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          dispatch({ type: 'AUTH_START' });
          
          const validation = await authService.validateToken();
          
          if (validation.valid && validation.user) {
            dispatch({ type: 'AUTH_SUCCESS', payload: validation.user });
          } else {
            dispatch({ type: 'AUTH_LOGOUT' });
          }
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Realiza login do usuário
   * @param credentials Credenciais de login
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await authService.login(credentials);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      
      // Login bem-sucedido - não fazer throw
      return;
      
    } catch (error: any) {
      console.error('Erro no AuthContext login:', error);
      
      const errorMessage = error.message || 'Erro ao fazer login';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      
      // CORREÇÃO: NÃO fazer throw do erro para evitar recarregamento
      // O erro deve ser tratado pelos componentes que chamam esta função
      // através do estado `error` do contexto
      
      // throw error; ← REMOVIDO - Esta linha causava o recarregamento!
    }
  };

  /**
   * Realiza logout do usuário
   */
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  /**
   * Renova token de acesso
   */
  const refreshToken = async (): Promise<void> => {
    try {
      await authService.refreshToken();
      
      // Revalidar usuário após refresh
      const validation = await authService.validateToken();
      
      if (validation.valid && validation.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: validation.user });
      } else {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
      throw error;
    }
  };

  /**
   * Atualiza dados do usuário
   * @param userData Dados parciais do usuário
   */
  const updateUser = (userData: Partial<IUser>): void => {
    dispatch({ type: 'AUTH_UPDATE_USER', payload: userData });
  };

  /**
   * Limpa erro de autenticação
   */
  const clearError = (): void => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  /**
   * Verifica se o usuário tem uma role específica
   * @param roleSlug Slug da role
   * @returns True se o usuário tem a role
   */
  const hasRole = (roleSlug: string): boolean => {
    return state.user?.roles?.some(
      role => typeof role === "string" 
        ? (role as string)?.toLowerCase() === roleSlug.toLowerCase()
        : role?.slug?.toLowerCase() === roleSlug.toLowerCase()
    ) || false;
  };

  /**
   * Verifica se o usuário tem uma permissão específica
   * @param permissionSlug Slug da permissão
   * @returns True se o usuário tem a permissão
   */
//   const hasPermission = (permissionSlug: string): boolean => {
//     // Verificar permissões diretas
//     const hasDirectPermission = state.user?.permissions?.some(
//       permission => permission.slug === permissionSlug
//     );

//     // Verificar permissões através de roles
//     const hasRolePermission = state.user?.roles?.some(role =>
//       role.permissions?.some(permission => permission.slug.toLowerCase() === permissionSlug.toLowerCase())
//     );

//     return hasDirectPermission || hasRolePermission || false;
//   };

  

  //@ts-ignore
  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    refreshToken,
    updateUser,
  };

  // Adicionar métodos extras ao contexto
  const extendedContextValue = {
    ...contextValue,
    error: state.error,
    clearError,
    hasRole,
    // hasPermission,
  };

  return (
    <AuthContext.Provider value={extendedContextValue as any}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 * @returns Contexto de autenticação
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context as AuthContextType & {
    error: string | null;
    clearError: () => void;
    hasRole: (roleSlug: string) => boolean;
    hasPermission: (permissionSlug: string) => boolean;
  };
}

export default AuthContext;