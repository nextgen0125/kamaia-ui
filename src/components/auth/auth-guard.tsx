'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useLogout } from '@/hooks/queries/use-auth';
import { Logo } from '../logo';

interface AuthGuardProps {
  children: React.ReactNode;
  /**
   * Roles necessárias para acessar a rota (opcional)
   * Se especificado, o usuário deve ter pelo menos uma das roles
   */
  requiredSuperAdminRoles?: string[];
  /**
   * Permissões tentants necessárias para acessar a rota (opcional)
   * Se especificado, o usuário deve ter pelo menos uma das permissões
   */
  requiredCompanyPermissions?: string[];
    /**
   * Cargos Tenants necessárias para acessar a rota (opcional)
   * Se especificado, o usuário deve ter pelo menos uma das permissões
   */
  requiredCompanyRoles?: string[];
  /**
   * URL para redirecionamento em caso de não autenticado
   * Padrão: '/login'
   */
  redirectTo?: string;
  /**
   * URL para redirecionamento em caso de acesso negado (sem permissão)
   * Padrão: '/unauthorized'
   */
  unauthorizedRedirectTo?: string;
  /**
   * Se deve mostrar loading enquanto verifica autenticação
   * Padrão: true
   */
  showLoading?: boolean;

    /**
   * Acessar Somente se for cliente.
   * padrão: false
   */
  onlyCoustumer?: boolean;


  /**
   * Se deve mostrar página de erro em caso de acesso negado
   * Padrão: true
   */
  showUnauthorized?: boolean;
  /**
   * Callback executado quando usuário não está autenticado
   */
  onUnauthenticated?: () => void;
  /**
   * Callback executado quando usuário não tem permissão
   */
  onUnauthorized?: () => void;
}

/**
 * Componente para proteger rotas que exigem autenticação
 * 
 * @example
 * // Proteção básica - apenas autenticação
 * <AuthGuard>
 *   <DashboardPage />
 * </AuthGuard>
 * 
 * @example
 * // Proteção com roles específicas
 * <AuthGuard requiredSuperAdminRoles={['admin', 'manager']}>
 *   <AdminPanel />
 * </AuthGuard>
 * 
 * @example
 * // Proteção com permissões específicas
 * <AuthGuard requiredCompanyPermissions={['users.create', 'users.edit']}>
 *   <UserManagement />
 * </AuthGuard>
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredSuperAdminRoles = [],
  requiredCompanyPermissions = [],
  requiredCompanyRoles = [],
  redirectTo = '/login',
  unauthorizedRedirectTo = '/unauthorized',
  showLoading = true,
  showUnauthorized = true,
  onlyCoustumer = false,
  onUnauthenticated,
  onUnauthorized,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { company_id } = useParams();

  const {
    isAuthenticated,
    isLoading,
    user,
    hasSuperAdminRole,
    hasCompanyPermission,
    hasCompanyRole,
    isCostumer
  } = useAuth();

  const logout = useLogout();

  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessDeniedReason, setAccessDeniedReason] = useState<string>('');

  const handleAccessDenied = (accessDeniedReason: string, ) => {
    setAccessDeniedReason(accessDeniedReason);
    onUnauthorized?.();
    
    if (!showUnauthorized) {
    router.replace(unauthorizedRedirectTo);
    return;
    }
    
    setHasAccess(false);
    setIsChecking(false);
  } 

  useEffect(() => {
    const checkAccess = async () => {
      setIsChecking(true);

      // Aguardar carregamento inicial da autenticação
      if (isLoading) {
        return;
      }

      // Verificar se está autenticado
      if (!isAuthenticated) {
        // console.log('AuthGuard: Usuário não autenticado, redirecionando para login');
        
        // Salvar URL atual para redirecionamento após login
        const returnUrl = encodeURIComponent(pathname);
        const loginUrl = `${redirectTo}?returnUrl=${returnUrl}`;
        
        onUnauthenticated?.();
        router.replace(loginUrl);
        return;
      }

      // Verificar roles de superAdmin se especificadas
      if (requiredSuperAdminRoles.length > 0) {
        const hasRequiredRole = requiredSuperAdminRoles.some(role => hasSuperAdminRole(role));
        if (!hasRequiredRole) {
            handleAccessDenied(`Acesso negado. Cargos necessários: ${requiredSuperAdminRoles.join(', ')}`)
            return;
        }
      }


        // Verificar permissões se especificadas
      if (requiredCompanyRoles.length > 0) {
        const hasRequiredRole = requiredCompanyRoles.some(role => hasCompanyRole(role, company_id as string));
        if (!hasRequiredRole) {
          handleAccessDenied(`Acesso negado. Permissões necessárias: ${requiredCompanyRoles.join(', ')}`)
          return;
        }
      }

      // Verificar permissões se especificadas
      if (requiredCompanyPermissions.length > 0) {
        const hasRequiredPermission = requiredCompanyPermissions.some(permission => hasCompanyPermission(permission, company_id as string));
        if (!hasRequiredPermission) {
            handleAccessDenied(`Acesso negado. Permissões necessárias: ${requiredCompanyPermissions.join(', ')}`)
          return;
        }
      }

        // Verificar se o usuário é um cliente
      if (onlyCoustumer) {
        if (!isCostumer()) {
            handleAccessDenied(`Acesso negado. O usuário precisa ser um cliente`)
            return;
        }
      }

      // Usuário tem acesso
      setHasAccess(true);
      setIsChecking(false);
    };

    checkAccess();
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredSuperAdminRoles,
    requiredCompanyPermissions,
    pathname,
    router,
    redirectTo,
    unauthorizedRedirectTo,
    showUnauthorized,
    hasSuperAdminRole,
    hasCompanyPermission,
    onUnauthenticated,
    onUnauthorized,
    onlyCoustumer
  ]);

  useEffect(() => {
    if (logout && logout.isSuccess) {
      router.push("/");
    }
  }, [logout]);

  // Mostrar loading enquanto verifica
  if (isLoading || isChecking) {
    if (!showLoading) {
      return null;
    }

    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Logo />

          </div> 
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
            <Logo />
            </div> */}
          <h2 className="text-xl font-semibold text-muted-foreground  mb-2">Verificando acesso</h2>
          <p className="text-muted-foreground mb-4">Aguarde enquanto validamos suas permissões...</p>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
            <span className="text-sm text-muted-foreground">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar página de acesso negado
  if (!hasAccess && showUnauthorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-muted-foreground  mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground mb-4">
            Você não tem permissão para acessar esta página.
          </p>
          {accessDeniedReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">{accessDeniedReason}</p>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full bg-gray-500 border border-gray-200 rounded-lg p-2 cursor-pointer"
            >
              Voltar
            </button>
            
            <button
              onClick={() => logout.mutateAsync()}
              className="w-full bg-red-500 border border-red-200 rounded-lg p-2 cursor-pointer"
            >
              Terminar sessão
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Usuário tem acesso, renderizar children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Fallback - não renderizar nada
  return null;
};

export default AuthGuard;

