import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('melodymate_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple authentication simulation
    // In a real app, this would call an API
    const userData = {
      email,
      name: email.split('@')[0],
      id: Date.now()
    };
    setUser(userData);
    localStorage.setItem('melodymate_user', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name, email, password) => {
    // Simple signup simulation
    const userData = {
      email,
      name,
      id: Date.now()
    };
    setUser(userData);
    localStorage.setItem('melodymate_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('melodymate_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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
