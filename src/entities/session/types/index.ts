export interface JWT {
  accessToken: string;
  refreshToken: string;
}

export interface SessionState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  setIsAuthenticated: (value: boolean) => void;
  refreshTokens: () => Promise<JWT | void>;
  logout: () => Promise<void>;
}
