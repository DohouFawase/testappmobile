import { AuthState } from '@/types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  USER: '@user',
  TOKEN: '@token',
} as const;

// Simulation d'utilisateurs
const MOCK_USERS = [
  { id: '1', email: 'test@test.com', password: 'password', name: 'Utilisateur Test' },
  { id: '2', email: 'demo@demo.com', password: 'demo123', name: 'Démo User' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [userJson, token] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
      ]);

      if (userJson && token) {
        const user = JSON.parse(userJson);
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation de l'authentification
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return false;
      }

      const userToStore = { id: user.id, email: user.email, name: user.name };
      const token = `mock_token_${user.id}_${Date.now()}`;

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userToStore)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      ]);

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: userToStore,
      });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = MOCK_USERS.find(u => u.email === email);
      if (existingUser) {
        return false;
      }

      // Créer un nouvel utilisateur (simulation)
      const newUser = {
        id: `${Date.now()}`,
        email,
        name,
      };

      const token = `mock_token_${newUser.id}_${Date.now()}`;

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      ]);

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: newUser,
      });

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      ]);

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};