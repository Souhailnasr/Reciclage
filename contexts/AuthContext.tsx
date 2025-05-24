import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole } from '../models/User';

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load auth state from storage on mount
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    // Pour le test, on force la déconnexion à chaque démarrage
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const login = async (user: User, token: string) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 