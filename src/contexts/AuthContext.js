import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('ecommerce_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user validation
        const users = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userSession = { ...user };
          delete userSession.password; // Don't store password in session
          setUser(userSession);
          localStorage.setItem('ecommerce_user', JSON.stringify(userSession));
          resolve(userSession);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('User already exists with this email'));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          role: 'customer',
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('ecommerce_users', JSON.stringify(users));

        const userSession = { ...newUser };
        delete userSession.password;
        setUser(userSession);
        localStorage.setItem('ecommerce_user', JSON.stringify(userSession));
        
        resolve(userSession);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecommerce_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};