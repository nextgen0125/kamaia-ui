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