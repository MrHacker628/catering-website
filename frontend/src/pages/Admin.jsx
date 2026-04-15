// React doesn't load everything automatically.
// You have to TELL it what you need.

// import React        → needed for JSX to work
// import { useState } → needed for useState()
// import { useEffect }→ needed for useEffect()
// import axios        → needed to call backend API
// import './Admin.css'→ loads the CSS styling

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Package, Calendar, Users, CreditCard, DollarSign, TrendingUp, Trash2 } from 'lucide-react';
import './Admin.css';

function Admin() {

  /* Think of it like a **door lock** 🔒
 ```
 isAuthenticated = false  →  Door is LOCKED
                              Admin page is HIDDEN
                              Password screen is SHOWN
 
 isAuthenticated = true   →  Door is UNLOCKED  
                              Password screen is HIDDEN
                              Admin dashboard is SHOWN
  */

  // This variable watches if admin is logged in
  // false = not logged in yet
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This stores what admin types in password box
  const [passwordInput, setPasswordInput] = useState('');

  // This stores error message if wrong password
  const [passwordError, setPasswordError] = useState('');

  const [tab, setTab] = useState('analytics');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    item_name: '', category: '', quantity: '', unit: '', minimum_stock: '', price_per_unit: ''
  });

  // This function runs when Login button is clicked
  function handlePasswordSubmit() {

    if (passwordInput === ADMIN_PASSWORD) {
      // Password correct! unlock the dashboard
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setPasswordError('❌ Wrong password. Try again!');
    }
  }

  // ─────────────────────────────────────────
  // fetchAllData — gets ALL data from backend
  // Promise.all fetches everything AT THE SAME TIME
  // faster than fetching one by one!
  // ─────────────────────────────────────────
  function fetchAllData() {
    setLoading(true); // show loading message

    // get token from localStorage
    const token = localStorage.getItem('token');

    // headers object — sends token with every request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Send 4 requests at the same time
    Promise.all([
      axios.get('http://localhost:5000/orders/all', config),
      axios.get('http://localhost:5000/customers/all', config),
      axios.get('http://localhost:5000/inventory/all', config),
      axios.get('http://localhost:5000/payments/all', config)
    ])
      .then(function ([ordersRes, customersRes, inventoryRes, paymentsRes]) {
        // Save each response into its useState variable
        console.log("✅ Orders:", ordersRes.data);
        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
        setInventory(inventoryRes.data);
        setPayments(paymentsRes.data);
        setLoading(false); // hide loading message
      })
      .catch(function (error) {
        console.log("❌ Error:", error.response?.data);
        
        setLoading(false);
      });
  }

  useEffect(() => { if (isAuth) fetchAll(); }, [isAuth]);

  // Updates order status when admin changes dropdown
  function updateOrderStatus(orderId, newStatus) {

    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/orders/status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
    )
    .then(function() {
        fetchAllData();
    });

    axios.put(`http://localhost:5000/orders/status/${orderId}`, {
      order_status: newStatus
    })
      .then(function () {
        fetchAllData();
        alert('✅ Order status updated!');
      });
  }

  // stores what admin types in inventory form
  const [newItem, setNewItem] = useState({
    item_name: '', category: '', quantity: '',
    unit: '', minimum_stock: '', price_per_unit: ''
  });

  // updates newItem when admin types in form
  function handleInventoryChange(e) {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  // adds new item to database
  function addInventoryItem() {
       if (!newItem.item_name || !newItem.quantity) {
        alert('Please fill item name and quantity!');
        return;
    }
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/inventory/add', newItem,
        { headers: { Authorization: `Bearer ${token}` }}
    )
    .then(function() {
        alert('✅ Item added!');
        fetchAllData();
        setNewItem({
            item_name: '', category: '', quantity: '',
            unit: '', minimum_stock: '', price_per_unit: ''
        });
    });
  }

  // deletes item from database
  function deleteInventoryItem(itemId) {
     if (window.confirm('Are you sure you want to delete?')) {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:5000/inventory/delete/${itemId}`,
            { headers: { Authorization: `Bearer ${token}` }}
        )
        .then(function() {
            fetchAllData();
        });
    }
  }

  // ─────────────────────────────────────────
  // useEffect — runs when isAuthenticated changes
  // When admin logs in → fetch all data!
  // ─────────────────────────────────────────
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }

  // Stats
  const totalRev = orders.reduce((s, o) => s + (parseFloat(o.total_amount) || 0), 0);
  const avgOrder = orders.length > 0 ? totalRev / orders.length : 0;
  const successPay = payments.filter(p => p.payment_status === 'success').length;

  // ─────────────────────────────────────────
  // if NOT logged in → show password screen
  // ! means NOT
  // so !isAuthenticated means "if NOT authenticated"
  // ─────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>🔒 Admin Access</h2>
          <p>Enter the password and continue</p>
          <input type="password" placeholder='Enter the Password' value={passwordInput}
            // every time you type — update passwordInput 
            onChange={(e) => setPasswordInput(e.target.value)}
            // pressing Enter also works!
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()} />

          {/* show error only if passwordError is not empty */}
          {passwordError && <p className="admin-error">{passwordError}</p>}

          <button onClick={handlePasswordSubmit}>
            Login to Admin 🔓
          </button>
        </div>
      </div>
    );
  }

  // const [activeTab, setActiveTab] = useState('inventory');
  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <h1>🍽️Mannat catering- Admin Dashboard</h1>
        <p>Manage your catering business here</p>

        {/* STATS — 4 number cards at the top */}
        <div className="admin-stats">

          <div className="stat-card">
            {/* orders.length = number of orders in array */}
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>

          <div className="stat-card">
            <h3>{customers.length}</h3>
            <p>Customers</p>
          </div>

          <div className="stat-card">
            <h3>{inventory.length}</h3>
            <p>Inventory Items</p>
          </div>

          <div className="stat-card">
            {/* filter only successful payments */}
            <h3>{payments.filter(p => p.payment_status === 'success').length}</h3>
            <p>Payments Done</p>
          </div>

        </div>

      </div>

      {/* TAB BUTTONS — switching between sections */}
      <div className="admin-tabs">
        {/* 
          className={activeTab === 'orders' ? 'active' : ''}
          This means:
          IF activeTab is 'orders' → add class 'active' (purple)
          IF not → no class (grey)
        */}

        <button className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}>
          📋Orders
        </button>

        <button className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => setActiveTab('customers')}>
          🛃Customers
        </button>

        <button className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}>
          📦Inventory
        </button>

        <button className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}>
          💳Payments
        </button>
      </div>

      {/* CONTENT AREA — we will add tables here next */}
      {/* CONTENT AREA */}
      <div className="admin-content">

        {loading && <p className="loading">Loading... ⏳</p>}

        {activeTab === 'orders' && (
          <div>
            <h2>All Orders ({orders.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Event Type</th>
                  <th>Event Date</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Advance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(function (order) {
                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        {order.full_name}<br />
                        <small>{order.phone}</small>
                      </td>
                      <td>{order.event_type}</td>
                      <td>{new Date(order.event_date).toLocaleDateString()}</td>
                      <td>{order.num_of_guests}</td>
                      <td>₹{order.total_amount}</td>
                      <td>₹{order.advance_amount}</td>
                      <td>
                        <span className={`status-badge ${order.order_status}`}>
                          {order.order_status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.order_status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
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

        {activeTab === 'customers' && (
          <div>
            <h2>All Customers ({customers.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(function (customer) {
                  return (
                    <tr key={customer.id}>
                      <td>#{customer.id}</td>
                      <td>{customer.full_name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'inventory' && (
          <div>
            <h2>Inventory Management</h2>

            {/* ── ADD NEW ITEM FORM ── */}
            <div className="add-item-form">
              <h3>➕ Add New Item</h3>
              <div className="form-row">
                <input
                  name="item_name"
                  placeholder="Item Name"
                  value={newItem.item_name}
                  onChange={handleInventoryChange}
                />
                <input
                  name="category"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={handleInventoryChange}
                />
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={handleInventoryChange}
                />
                <input
                  name="unit"
                  placeholder="Unit (kg/L/pcs)"
                  value={newItem.unit}
                  onChange={handleInventoryChange}
                />
                <input
                  name="minimum_stock"
                  type="number"
                  placeholder="Min Stock"
                  value={newItem.minimum_stock}
                  onChange={handleInventoryChange}
                />
                <input
                  name="price_per_unit"
                  type="number"
                  placeholder="Price per unit"
                  value={newItem.price_per_unit}
                  onChange={handleInventoryChange}
                />
                <button className="add-btn" onClick={addInventoryItem}>
                  Add ➕
                </button>
              </div>
            </div>

            {/* ── INVENTORY TABLE ── */}
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Min Stock</th>
                  <th>Price/Unit</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(function (item) {
                  // check if stock is below minimum
                  const isLowStock = item.quantity <= item.minimum_stock;
                  return (
                    <tr key={item.id} className={isLowStock ? 'low-stock' : ''}>
                      <td>#{item.id}</td>
                      <td>{item.item_name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.minimum_stock}</td>
                      <td>₹{item.price_per_unit}</td>
                      <td>
                        {isLowStock
                          ? <span className="low-badge">⚠️ Low Stock</span>
                          : <span className="ok-badge">✅ OK</span>
                        }
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteInventoryItem(item.id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'payments' && (
          <div>
            <h2>All Payments ({payments.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Event Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  // show this message if no payments yet
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                      No payments yet 💳
                    </td>
                  </tr>
                ) : (
                  payments.map(function (payment) {
                    return (
                      <tr key={payment.id}>
                        <td>#{payment.id}</td>
                        <td>{payment.full_name}</td>
                        <td>{payment.event_type}</td>
                        <td>₹{payment.amount}</td>
                        <td>
                          <span className={`status-badge ${payment.payment_status}`}>
                            {payment.payment_status}
                          </span>
                        </td>
                        <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default Admin;
