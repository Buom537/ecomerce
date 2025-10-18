import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      onNavigate('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials for testing
  const demoLogin = (role) => {
    if (role === 'admin') {
      setFormData({ email: 'admin@demo.com', password: 'admin123' });
    } else {
      setFormData({ email: 'user@demo.com', password: 'user123' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login to Your Account</h2>
        
        <div className="demo-section">
          <p>Demo Accounts:</p>
          <button type="button" onClick={() => demoLogin('admin')} className="demo-btn">
            Admin Demo (admin@demo.com)
          </button>
          <button type="button" onClick={() => demoLogin('user')} className="demo-btn">
            Customer Demo (user@demo.com)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>Don't have an account?</p>
          <button onClick={() => onNavigate('register')} className="link-btn">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;