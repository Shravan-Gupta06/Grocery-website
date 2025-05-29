import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getCurrentUser, setCurrentUser, removeCurrentUser, saveUser, findUserByEmail, getUsers } from '../utils/storage';
import { generateId } from '../utils/formatters';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  signup: () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = findUserByEmail(email);
    
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      setCurrentUser(foundUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Check if user already exists
    if (findUserByEmail(email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
    };

    saveUser(newUser);
    setUser(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = (): void => {
    setUser(null);
    removeCurrentUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};