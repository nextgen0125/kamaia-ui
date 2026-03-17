
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  LoginCredentials,
  ResetPasswordData, 
} from '@/interfaces/IAuth';
import { useAuth } from '@/contexts/auth-context';
import React from 'react';
import authService from '@/services/auth-service';
import { IUser } from '@/interfaces/IUser';

/**
 * Chaves de query para React Query
 */
export const authQueryKeys = {
  profile: ['auth', 'profile'] as const,
  session: ['auth', 'session'] as const,
  validateToken: ['auth', 'validate-token'] as const,
  tokenInfo: ['auth', 'token-info'] as const,
};

/**
 * Hook para login com React Query
 * @returns Mutation para login
 */
export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await login(credentials);
    },
    onSuccess: () => {
      // Invalidar queries relacionadas à autenticação
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.validateToken });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.tokenInfo });
    },
    onError: (error) => {
      console.error('Erro no login:', error);
    },
  });
}


/**
 * Hook para logout com React Query
 * @returns Mutation para logout
 */
export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Limpar todas as queries do cache
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Erro no logout:', error);
    },
  });
}

/**
 * Hook para obter perfil do usuário
 * @returns Query com dados do perfil
 */
export function useProfile() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authQueryKeys.profile,
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount, error: any) => {
      // Não tentar novamente se for erro 401 (não autorizado)
      if (error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Hook para validar token
 * @returns Query com validação do token
 */
export function useValidateToken() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authQueryKeys.validateToken,
    queryFn: () => authService.validateToken(),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchInterval: 5 * 60 * 1000, // Revalidar a cada 5 minutos
    retry: false,
  });
}


/**
 * Hook para informações do token
 * @returns Query com informações do token
 */
export function useTokenInfo() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authQueryKeys.tokenInfo,
    queryFn: () => authService.getTokenInfo(),
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minuto
    refetchInterval: 2 * 60 * 1000, // Revalidar a cada 2 minutos
  });
}

/**
 * Hook para refresh token
 * @returns Mutation para refresh token
 */
export function useRefreshToken() {
  const { refreshToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await refreshToken();
    },
    onSuccess: () => {
      // Invalidar queries relacionadas à autenticação
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.validateToken });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.tokenInfo });
    },
    onError: (error) => {
      console.error('Erro ao renovar token:', error);
    },
  });
}


/**
 * Hook para atualizar perfil do usuário
 * @returns Mutation para atualizar perfil
 */
export function useUpdateProfile() {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<IUser>) => {
      // Aqui você implementaria a chamada para atualizar o perfil na API
      // Por enquanto, apenas atualiza o contexto local
      updateUser(userData);
      return userData;
    },
    onSuccess: (updatedData) => {
      // Atualizar cache do perfil
      queryClient.setQueryData(authQueryKeys.profile, (oldData: IUser | undefined) => {
        if (oldData) {
          return { ...oldData, ...updatedData };
        }
        return oldData;
      });

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
    },
    onError: (error) => {
      console.error('Erro ao atualizar perfil:', error);
    },
  });
}

/**
 * Hook para monitoramento automático de expiração de token
 */
export function useTokenMonitoring() {
  const tokenInfo = useTokenInfo();
  const refreshTokenMutation = useRefreshToken();

  // Verificar se o token está expirando e renovar automaticamente
  React.useEffect(() => {
    if (tokenInfo.data?.expiringSoon && !tokenInfo.data?.isExpired) {
      refreshTokenMutation.mutate();
    }
  }, [tokenInfo.data?.expiringSoon, tokenInfo.data?.isExpired, refreshTokenMutation]);

  return {
    tokenInfo: tokenInfo.data,
    isMonitoring: tokenInfo.isLoading,
    refreshToken: refreshTokenMutation,
  };
}

/**
 * Hook para esqueci minha senha
 * @returns Mutation para solicitar reset de senha
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      console.log('Solicitação de recuperação de senha enviada');
    },
    onError: (error) => {
      console.error('Erro ao solicitar reset de senha:', error);
    },
  });
}

/**
 * Hook para reset de senha
 * @returns Mutation para redefinir senha
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
    onSuccess: () => {
      console.log('Senha redefinida com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao redefinir senha:', error);
    },
  });
}

/**
 * Hook para verificação de email
 * @returns Mutation para verificar email
 */
export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: (user) => {
      // Atualizar cache do perfil com dados atualizados
      queryClient.setQueryData(authQueryKeys.profile, user);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
    },
    onError: (error) => {
      console.error('Erro ao verificar email:', error);
    },
  });
}

/**
 * Hook para reenvio de verificação de email
 * @returns Mutation para reenviar verificação
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: () => authService.resendVerification(),
    onSuccess: () => {
      console.log('Email de verificação reenviado');
    },
    onError: (error) => {
      console.error('Erro ao reenviar verificação:', error);
    },
  });
}

/**
 * Hook combinado para autenticação
 * Fornece acesso a todas as funcionalidades de autenticação
 */
export function useAuthOperations() {
  const auth = useAuth();
  const loginMutation = useLogin();
//   const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const refreshTokenMutation = useRefreshToken();
//   const forgotPasswordMutation = useForgotPassword();
//   const resetPasswordMutation = useResetPassword();
//   const verifyEmailMutation = useVerifyEmail();
//   const resendVerificationMutation = useResendVerification();
//   const changePasswordMutation = useChangePassword();
  const updateProfileMutation = useUpdateProfile();

  const profileQuery = useProfile();
  const validateTokenQuery = useValidateToken();
  const tokenInfoQuery = useTokenInfo();

  return {
    // Contexto de autenticação
    ...auth,
    
    // Mutations
    login: loginMutation,
    // register: registerMutation,
    logout: logoutMutation,
    refreshToken: refreshTokenMutation,
    // forgotPassword: forgotPasswordMutation,
    // resetPassword: resetPasswordMutation,
    // verifyEmail: verifyEmailMutation,
    // resendVerification: resendVerificationMutation,
    // changePassword: changePasswordMutation,
    updateProfile: updateProfileMutation,
    
    // Queries
    profile: profileQuery,
    validateToken: validateTokenQuery,
    tokenInfo: tokenInfoQuery,
    
    // Estados combinados
    isLoading: auth.isLoading || 
               loginMutation.isPending || 
            //    registerMutation.isPending ||
               logoutMutation.isPending || 
               refreshTokenMutation.isPending,
    
    isError: loginMutation.isError || 
            //  registerMutation.isError ||
             logoutMutation.isError || 
             refreshTokenMutation.isError ||
             profileQuery.isError,

    
    error: auth.error || 
           loginMutation.error?.message || 
        //    registerMutation.error?.message ||
           logoutMutation.error?.message || 
           refreshTokenMutation.error?.message ||
           profileQuery.error?.message 
  };
}
