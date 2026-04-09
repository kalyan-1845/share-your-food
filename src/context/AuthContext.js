import React, { createContext, useContext, useState, useEffect } from 'react';
import mockService from '../services/mockService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockService.init();
    const checkUser = async () => {
      const savedUser = await mockService.getUser();
      setUser(savedUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  const signup = async (userData) => {
    const res = await mockService.signup(userData);
    setUser(res.user);
    return res;
  };

  const login = async (email, password) => {
    const res = await mockService.login(email, password);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await mockService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
