import { createContext } from 'react';

export interface AuthSession {
  token: string;
  accountId: string;
  /** Shown in the header; the login name when the account has no full name. */
  displayName: string;
  /**
   * Seller profile of the account: none, submitted and waiting, or open for sale. The login answer does not carry
   * it yet, so it is 'none' until identity-service exposes it.
   */
  sellerStatus: SellerStatus;
}

export type SellerStatus = 'none' | 'pending' | 'open';

export interface AuthContextValue {
  session: AuthSession | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
