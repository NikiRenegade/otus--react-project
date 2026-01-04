import React, { createContext, useState } from 'react';
import { User } from '../entities/User';
export type Theme = 'light' | 'dark';

interface AuthContextProps {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
