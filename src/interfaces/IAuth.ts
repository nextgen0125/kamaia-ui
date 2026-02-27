import { IRefreshToken } from "./IRefreshToken";
import { IUser } from "./IUser";


export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
    user: IUser;
    token: string;
    refresh_token: IRefreshToken;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  status: number;
  timestamp: string;
}

/**
 * Interface para dados de registro
 */
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
}

/**
 * Interface para contexto de autenticação
 */
export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<IUser>) => void;
  clearError: () => void;
}

/**
 * Interface para sessão do usuário
 */
export interface UserSession {
  user: IUser;
  isAuthenticated: boolean;
  loginTime?: string;
  permissions: string[];
  roles: string[];
}

/**
 * Interface para validação de token
 */
export interface TokenValidation {
  valid: boolean;
  user?: IUser;
}

/**
 * Tipos para status de autenticação
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/**
 * Tipos para ações de autenticação
 */
export type AuthAction = 
  | 'login'
  | 'logout'
  | 'register'
  | 'refresh-token'
  | 'forgot-password'
  | 'reset-password'
  | 'verify-email'
  | 'update-profile';

/**
 * Interface para configuração do serviço de autenticação
 */
export interface AuthServiceConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  tokenRefreshThreshold: number; // em segundos
}