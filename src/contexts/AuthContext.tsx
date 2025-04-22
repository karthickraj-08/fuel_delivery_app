
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';

// Mock authentication for demo purposes
const MOCK_USERS = {
  admin: {
    id: 'admin-1',
    email: 'admin@fuelonwheels.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  station: {
    id: 'station-1',
    email: 'station@fuelonwheels.com',
    name: 'Station Manager',
    role: 'station' as UserRole,
  },
  user: {
    id: 'user-1',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user' as UserRole,
    phone: '555-1234',
    address: '123 Main St',
  },
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, phone: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('fuel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating backend validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo login - in a real app this would verify credentials against backend
      let foundUser = null;
      if (email === 'admin@fuelonwheels.com' && password === 'admin') {
        foundUser = MOCK_USERS.admin;
      } else if (email === 'station@fuelonwheels.com' && password === 'station') {
        foundUser = MOCK_USERS.station;
      } else if (email === 'user@example.com' && password === 'user') {
        foundUser = MOCK_USERS.user;
      } else {
        return false;
      }

      setUser(foundUser);
      localStorage.setItem('fuel_user', JSON.stringify(foundUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, phone: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo registration - would create a new user in backend
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user' as UserRole,
        phone,
      };
      
      setUser(newUser);
      localStorage.setItem('fuel_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fuel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
