import { createContext } from 'react';
import type { User } from '../api/interfaces/user-interfaces';

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
