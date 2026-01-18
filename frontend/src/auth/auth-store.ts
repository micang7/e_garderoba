import type { User } from '../api/interfaces/user-interfaces';

export const authStore = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
