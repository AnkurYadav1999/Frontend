export type UserRole = 'guest' | 'seeker' | 'employer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
}

export interface AuthSession {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  user: UserProfile | null;
}

export interface AuthProviderAdapter {
  getAccessToken(): Promise<string | null>;
  setSession(session: AuthSession): void;
  clearSession(): void;
  onSessionExpired(callback: () => void): () => void;
}

class InMemoryAuthAdapter implements AuthProviderAdapter {
  private session: AuthSession = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    user: null,
  };
  private expiredListeners: Array<() => void> = [];

  public async getAccessToken(): Promise<string | null> {
    if (this.session.expiresAt && Date.now() >= this.session.expiresAt) {
      this.notifySessionExpired();
      return null;
    }
    return this.session.accessToken;
  }

  public setSession(session: AuthSession): void {
    this.session = session;
  }

  public clearSession(): void {
    this.session = {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      user: null,
    };
  }

  public onSessionExpired(callback: () => void): () => void {
    this.expiredListeners.push(callback);
    return () => {
      this.expiredListeners = this.expiredListeners.filter((cb) => cb !== callback);
    };
  }

  private notifySessionExpired(): void {
    this.clearSession();
    this.expiredListeners.forEach((cb) => cb());
  }
}

export const authAdapter: AuthProviderAdapter = new InMemoryAuthAdapter();
