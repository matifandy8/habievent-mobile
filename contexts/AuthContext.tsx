import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthService } from '../services/AuthService';

type AuthContextType = {
  session: boolean;
  userId: string | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: false,
  userId: null,
  loading: true,
  signin: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        const data = await AuthService.validateToken();
        setUserId(data.userId);
        setSession(true);
      } catch {
        setUserId(null);
        setSession(false);
        await AsyncStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    validate();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const data = await AuthService.login(email, password);
      setUserId(data.user);
      setSession(true);
    } catch (err: any) {
      Alert.alert('Login failed', err.message);
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const data = await AuthService.register(username, email, password);
      setUserId(data.user);
      setSession(true);
    } catch (err: any) {
      Alert.alert('Register failed', err.message);
      throw err;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUserId(null);
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{ userId, loading, signin, register, logout, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);