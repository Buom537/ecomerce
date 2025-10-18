import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Initialize demo admin user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
    const adminExists = users.find(user => user.email === 'admin@demo.com');
    
    if (!adminExists) {
      const demoAdmin = {
        id: 'admin-1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      const demoCustomer = {
        id: 'user-1',
        firstName: 'Demo',
        lastName: 'Customer',
        email: 'user@demo.com',
        password: 'user123',
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      
      users.push(demoAdmin, demoCustomer);
      localStorage.setItem('ecommerce_users', JSON.stringify(users));
    }

    // Track page views for analytics
    console.log(`Analytics: Page view - ${currentPage}`);
  }, [currentPage]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <main className="main-content">
            {renderCurrentPage()}
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;