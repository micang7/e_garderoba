import { useState } from 'react';
import type { User } from '../api/interfaces/user-interfaces';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'));
  const [user, setUserState] = useState<User | null>(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const setToken = (t: string) => {
    localStorage.setItem('token', t);
    setTokenState(t);
  };

  const setUser = (u: User) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUserState(u);
  };

  const clear = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTokenState(null);
    setUserState(null);
  };

  const isAuth = () => !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, setToken, setUser, clear, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
