import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = ({ onNavigate }) => {
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!isAdmin) {
      onNavigate('home');
      return;
    }

    // Load orders and users from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
    
    setOrders(savedOrders);
    setUsers(savedUsers);
  }, [isAdmin, onNavigate]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('ecommerce_orders', JSON.stringify(updatedOrders));
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
    
    return { totalOrders, totalRevenue, pendingOrders, confirmedOrders };
  };

  const stats = getOrderStats();

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.firstName}! Manage your e-commerce system here.</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="stat-value">{stats.totalOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <div className="stat-value">{stats.pendingOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Confirmed Orders</h3>
          <div className="stat-value">{stats.confirmedOrders}</div>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders Management
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="admin-content">
          <h2>Orders Management</h2>
          {orders.length === 0 ? (
            <div className="no-data">
              <p>No orders found.</p>
            </div>
          ) : (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const customer = users.find(u => u.id === order.userId);
                    return (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'}</td>
                        <td>{order.items.length} items</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span className={`status ${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-content">
          <h2>Users Management</h2>
          {users.length === 0 ? (
            <div className="no-data">
              <p>No users found.</p>
            </div>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registration Date</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    const userOrders = orders.filter(order => order.userId === user.id);
                    return (
                      <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>{userOrders.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;