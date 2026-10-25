import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole, password?: string) => Promise<void>;
  logout: () => void;
}

const defaultDemoUser: User = {
  id: 'usr-001',
  name: 'SARATHI S',
  email: 'demo@smartirrigation.com',
  role: 'ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultDemoUser);

  const login = async (email: string, role: UserRole = 'ADMIN', password: string = 'demo123') => {
    try {
      const response = await apiService.login(email, password);
      if (response && response.success && response.user) {
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: (response.user.role as UserRole) || role,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
        });
        return;
      }
    } catch {
      // Graceful fallback to client authentication for demo / offline use
    }

    setUser({
      id: `usr-${Date.now()}`,
      name: email === 'demo@smartirrigation.com' ? 'SARATHI S' : email.split('@')[0],
      email: email,
      role: role,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
