
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  LoginCredentials, 
  LoginResponse, 
  AuthTokens,
  ApiError
} from '../interfaces/IAuth';

// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55555/v1';

/**
 * Service de autenticação refatorado
 * Implementa todas as operações de autenticação usando Axios
 * Inclui melhorias de tratamento de erro e recuperação de senha
 */
class AuthService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Configura interceptors para requisições e respostas
   */
  private setupInterceptors(): void {
    // Interceptor de requisição - adiciona token de autorização
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de resposta - trata erros e refresh token
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            const token = this.getStoredToken();
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        }

        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Realiza login do usuário
   * @param credentials Credenciais de login
   * @returns Dados do usuário e tokens
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        '/auth/login',
        credentials
      );

      const data = response.data;
      if (data) {
        const tokens = {
            accessToken: data.token,
            refreshToken: data.refresh_token.id,
            expiresIn: data.refresh_token.expires_in,
        }
        this.storeTokens(tokens);
        return data;
      }

      throw new Error('Dados de login inválidos');
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getStoredRefreshToken();
      
      if (refreshToken) {
        await this.api.post('/auth/logout', {
          refreshToken,
          logoutFromAllDevices: false,
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.clearStoredTokens();
    }
  }

    /**
   * Renova o token de acesso
   */
    async refreshToken(): Promise<AuthTokens> {
        try {
            const refreshToken = this.getStoredRefreshToken();
            
            if (!refreshToken) {
                throw new Error('Refresh token não encontrado');
            }

            const response: AxiosResponse<AuthTokens> = await this.api.post(
                '/auth/refresh-token',
                { refreshToken }
            );

            const data = response.data;
            if (data) {
                this.storeTokens(data);
                return data;
            }

            throw new Error('Erro ao renovar token');
        } catch (error) {
            this.clearStoredTokens();
            throw this.handleApiError(error);
        }
    }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const expiration = this.getTokenExpiration();
    
    if (!token || !expiration) {
      return false;
    }

    // Verificar se o token não expirou
    return Date.now() < expiration;
  }

  /**
   * Verifica se o token está próximo do vencimento
   * @param thresholdMinutes Minutos antes do vencimento para considerar "próximo"
   */
  isTokenExpiringSoon(thresholdMinutes: number = 5): boolean {
    const expiration = this.getTokenExpiration();
    
    if (!expiration) {
      return true;
    }

    const threshold = thresholdMinutes * 60 * 1000; // Converter para millisegundos
    return (expiration - Date.now()) < threshold;
  }

  /**
   * Obtém token armazenado
   */
  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  /**
   * Obtém refresh token armazenado
   */
  private getStoredRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  /**
   * Obtém tempo de expiração do token
   */
  private getTokenExpiration(): number | null {
    if (typeof window === 'undefined') return null;
    const expiration = localStorage.getItem('tokenExpiration');
    return expiration ? parseInt(expiration, 10) : null;
  }

  /**
   * Armazena tokens no localStorage
   */
  private storeTokens(tokens: AuthTokens): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    
    // Armazenar tempo de expiração
    const expirationTime = Date.now() + (tokens.expiresIn * 1000);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  /**
   * Remove tokens do localStorage
   */
  private clearStoredTokens(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
  }

  /**
   * Trata erros da API
   */
  private handleApiError(error: any): ApiError {
    if (error.response) {
      // Erro de resposta da API
      const { data, status } = error.response;
      
      return {
        success: false,
        message: data?.message || this.getDefaultErrorMessage(status),
        errors: data?.errors,
        status,
        timestamp: new Date().toISOString(),
      };
    } else if (error.request) {
      // Erro de rede
      return {
        success: false,
        message: 'Erro de conexão com o servidor. Verifique sua internet.',
        status: 0,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Erro de configuração
      return {
        success: false,
        message: error.message || 'Erro desconhecido',
        status: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Obtém mensagem de erro padrão baseada no status HTTP
   */
  private getDefaultErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Dados inválidos fornecidos';
      case 401:
        return 'Credenciais inválidas ou sessão expirada';
      case 403:
        return 'Acesso negado';
      case 404:
        return 'Recurso não encontrado';
      case 422:
        return 'Dados de entrada inválidos';
      case 429:
        return 'Muitas tentativas. Tente novamente mais tarde';
      case 500:
        return 'Erro interno do servidor';
      case 502:
        return 'Servidor temporariamente indisponível';
      case 503:
        return 'Serviço temporariamente indisponível';
      default:
        return 'Erro na comunicação com o servidor';
    }
  }

  /**
   * Obtém instância do Axios configurada
   */
  getApiInstance(): AxiosInstance {
    return this.api;
  }

  /**
   * Atualiza a URL base da API
   */
  updateBaseURL(newBaseURL: string): void {
    this.baseURL = newBaseURL;
    this.api.defaults.baseURL = newBaseURL;
  }

  /**
   * Obtém informações sobre o token atual
   */
  getTokenInfo(): {
    hasToken: boolean;
    isExpired: boolean;
    expiresIn: number | null;
    expiringSoon: boolean;
  } {
    const token = this.getStoredToken();
    const expiration = this.getTokenExpiration();
    const now = Date.now();

    if (!token || !expiration) {
      return {
        hasToken: false,
        isExpired: true,
        expiresIn: null,
        expiringSoon: false,
      };
    }

    const isExpired = now >= expiration;
    const expiresIn = Math.max(0, expiration - now);
    const expiringSoon = this.isTokenExpiringSoon();

    return {
      hasToken: true,
      isExpired,
      expiresIn,
      expiringSoon,
    };
  }
}

// Exportar instância singleton
export const authService = new AuthService();
export default authService;


