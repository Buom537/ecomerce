import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = ({ onNavigate, currentPage }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1 onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            E-Commerce System
          </h1>
        </div>
        
        <nav className="navigation">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
          {isAuthenticated && (
            <button 
              className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
              onClick={() => onNavigate('cart')}
            >
              Cart ({getCartItemsCount()})
            </button>
          )}
          {isAdmin && (
            <button 
              className={`nav-btn ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => onNavigate('admin')}
            >
              Admin
            </button>
          )}
        </nav>

        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.firstName}!</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="login-btn"
                onClick={() => onNavigate('login')}
              >
                Login
              </button>
              <button 
                className="register-btn"
                onClick={() => onNavigate('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;