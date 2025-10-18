import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsCheckingOut(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order = {
      id: Date.now().toString(),
      userId: user.id,
      items: cart,
      total: getCartTotal(),
      shippingAddress: checkoutData.shippingAddress,
      city: checkoutData.city,
      zipCode: checkoutData.zipCode,
      paymentMethod: checkoutData.paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save order to localStorage (in real app, this would be sent to server)
    const orders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
    orders.push(order);
    localStorage.setItem('ecommerce_orders', JSON.stringify(orders));

    alert(`Order confirmed! Order ID: ${order.id}`);
    clearCart();
    setShowCheckout(false);
    setIsCheckingOut(false);
    onNavigate('home');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to your cart to get started!</p>
          <button onClick={() => onNavigate('products')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="checkout-section">
          <h2>Checkout</h2>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ${getCartTotal().toFixed(2)}</strong>
            </div>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="checkout-form">
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label htmlFor="shippingAddress">Address:</label>
              <input
                type="text"
                id="shippingAddress"
                value={checkoutData.shippingAddress}
                onChange={(e) => setCheckoutData(prev => ({...prev, shippingAddress: e.target.value}))}
                required
                className="form-input"
                placeholder="Enter your shipping address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={checkoutData.city}
                  onChange={(e) => setCheckoutData(prev => ({...prev, city: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="City"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  value={checkoutData.zipCode}
                  onChange={(e) => setCheckoutData(prev => ({...prev, zipCode: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="ZIP Code"
                />
              </div>
            </div>

            <h3>Payment Information</h3>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                value={checkoutData.paymentMethod}
                onChange={(e) => setCheckoutData(prev => ({...prev, paymentMethod: e.target.value}))}
                className="form-select"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal (Demo)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number (Demo):</label>
              <input
                type="text"
                id="cardNumber"
                value={checkoutData.cardNumber}
                onChange={(e) => setCheckoutData(prev => ({...prev, cardNumber: e.target.value}))}
                className="form-input"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={checkoutData.expiryDate}
                  onChange={(e) => setCheckoutData(prev => ({...prev, expiryDate: e.target.value}))}
                  className="form-input"
                  placeholder="MM/YY"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  value={checkoutData.cvv}
                  onChange={(e) => setCheckoutData(prev => ({...prev, cvv: e.target.value}))}
                  className="form-input"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="back-btn"
                disabled={isCheckingOut}
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="place-order-btn"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : `Place Order ($${getCartTotal().toFixed(2)})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price}</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span>$5.99</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>${(getCartTotal() + 5.99).toFixed(2)}</span>
          </div>
          
          <button onClick={() => setShowCheckout(true)} className="checkout-btn">
            Proceed to Checkout
          </button>
          
          <button onClick={() => onNavigate('products')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;