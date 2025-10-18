import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../utils/productData';

const HomePage = ({ onNavigate }) => {
  const featuredProducts = products.slice(0, 6); // Show first 6 products as featured

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to E-Commerce System</h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast delivery.
          </p>
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <span>Secure Payments</span>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <span>Easy Returns</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🎧</div>
              <span>24/7 Support</span>
            </div>
          </div>
          <button 
            className="hero-cta"
            onClick={() => onNavigate('products')}
          >
            Shop Now
          </button>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
            alt="Shopping experience" 
          />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-large">💳</div>
              <h3>Secure Payments</h3>
              <p>Your payment information is protected with advanced encryption technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-large">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our efficient shipping network.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-large">⭐</div>
              <h3>Quality Products</h3>
              <p>We carefully curate our products to ensure the highest quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Check out our most popular items</p>
          </div>
          
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="view-all-container">
            <button 
              className="view-all-btn"
              onClick={() => onNavigate('products')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive deals and new product announcements</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <p className="newsletter-disclaimer">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>E-Commerce System</h3>
              <p>Your trusted online shopping destination with quality products and excellent service.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => onNavigate('products')}>Products</button></li>
                <li><button onClick={() => onNavigate('login')}>Account</button></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>Email: info@ecommerce-system.com</p>
              <p>Phone: 1-800-SHOP-NOW</p>
              <p>Address: 123 Commerce St, City, State 12345</p>
            </div>
            <div className="footer-section">
              <h4>Security & Privacy</h4>
              <p>🔒 SSL Encrypted</p>
              <p>🛡️ GDPR Compliant</p>
              <p>📱 Mobile Secure</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 E-Commerce System. All rights reserved. | B2C E-Commerce Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;