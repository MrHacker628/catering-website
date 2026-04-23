// React doesn't load everything automatically.
// You have to TELL it what you need.

// import React        → needed for JSX to work
// import { useState } → needed for useState()
// import { useEffect }→ needed for useEffect()
// import axios        → needed to call backend API
// import './Admin.css'→ loads the CSS styling

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Admin.css';

// function Admin() {

//   /* Think of it like a **door lock** 🔒
//  ```
//  isAuthenticated = false  →  Door is LOCKED
//                               Admin page is HIDDEN
//                               Password screen is SHOWN
 
//  isAuthenticated = true   →  Door is UNLOCKED  
//                               Password screen is HIDDEN
//                               Admin dashboard is SHOWN
//   */

//   // This variable watches if admin is logged in
//   // false = not logged in yet
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // This stores what admin types in password box
//   const [passwordInput, setPasswordInput] = useState('');

//   // This stores error message if wrong password
//   const [passwordError, setPasswordError] = useState('');

//   // The correct password — only you know this!
//   const ADMIN_PASSWORD = 'mannat2026';

//   const [activeTab, setActiveTab] = useState('orders');

//   // These store data fetched from MySQL
//   const [orders, setOrders] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);


//   // This function runs when Login button is clicked
//   function handlePasswordSubmit() {

//     if (passwordInput === ADMIN_PASSWORD) {
//       // Password correct! unlock the dashboard
//       setIsAuthenticated(true);
//       setPasswordInput('');
//     } else {
//       setPasswordError('❌ Wrong password. Try again!');
//     }
//   }

//   // ─────────────────────────────────────────
//   // fetchAllData — gets ALL data from backend
//   // Promise.all fetches everything AT THE SAME TIME
//   // faster than fetching one by one!
//   // ─────────────────────────────────────────
//   function fetchAllData() {
//     setLoading(true); // show loading message

//     // get token from localStorage
//     const token = localStorage.getItem('token');

//     // headers object — sends token with every request
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     };

//     // Send 4 requests at the same time
//     Promise.all([
//       axios.get('http://localhost:5000/orders/all', config),
//       axios.get('http://localhost:5000/customers/all', config),
//       axios.get('http://localhost:5000/inventory/all', config),
//       axios.get('http://localhost:5000/payments/all', config)
//     ])
//       .then(function ([ordersRes, customersRes, inventoryRes, paymentsRes]) {
//         // Save each response into its useState variable
//         console.log("✅ Orders:", ordersRes.data);
//         setOrders(ordersRes.data);
//         setCustomers(customersRes.data);
//         setInventory(inventoryRes.data);
//         setPayments(paymentsRes.data);
//         setLoading(false); // hide loading message
//       })
//       .catch(function (error) {
//         console.log("❌ Error:", error.response?.data);
        
//         setLoading(false);
//       });
//   }


//   // Updates order status when admin changes dropdown
//   function updateOrderStatus(orderId, newStatus) {

//     const token = localStorage.getItem('token');
//     axios.put(`http://localhost:5000/orders/status/${orderId}`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` }}
//     )
//     .then(function() {
//         fetchAllData();
//     });

//     axios.put(`http://localhost:5000/orders/status/${orderId}`, {
//       order_status: newStatus
//     })
//       .then(function () {
//         fetchAllData();
//         alert('✅ Order status updated!');
//       });
//   }

//   // stores what admin types in inventory form
//   const [newItem, setNewItem] = useState({
//     item_name: '', category: '', quantity: '',
//     unit: '', minimum_stock: '', price_per_unit: ''
//   });

//   // updates newItem when admin types in form
//   function handleInventoryChange(e) {
//     setNewItem({ ...newItem, [e.target.name]: e.target.value });
//   }

//   // adds new item to database
//   function addInventoryItem() {
//        if (!newItem.item_name || !newItem.quantity) {
//         alert('Please fill item name and quantity!');
//         return;
//     }
//     const token = localStorage.getItem('token');
//     axios.post('http://localhost:5000/inventory/add', newItem,
//         { headers: { Authorization: `Bearer ${token}` }}
//     )
//     .then(function() {
//         alert('✅ Item added!');
//         fetchAllData();
//         setNewItem({
//             item_name: '', category: '', quantity: '',
//             unit: '', minimum_stock: '', price_per_unit: ''
//         });
//     });
//   }

//   // deletes item from database
//   function deleteInventoryItem(itemId) {
//      if (window.confirm('Are you sure you want to delete?')) {
//         const token = localStorage.getItem('token');
//         axios.delete(`http://localhost:5000/inventory/delete/${itemId}`,
//             { headers: { Authorization: `Bearer ${token}` }}
//         )
//         .then(function() {
//             fetchAllData();
//         });
//     }
//   }

//   // ─────────────────────────────────────────
//   // useEffect — runs when isAuthenticated changes
//   // When admin logs in → fetch all data!
//   // ─────────────────────────────────────────
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchAllData();
//     }
//   }, [isAuthenticated]);


//   // ─────────────────────────────────────────
//   // if NOT logged in → show password screen
//   // ! means NOT
//   // so !isAuthenticated means "if NOT authenticated"
//   // ─────────────────────────────────────────
//   if (!isAuthenticated) {
//     return (
//       <div className="admin-login">
//         <div className="admin-login-box">
//           <h2>🔒 Admin Access</h2>
//           <p>Enter the password and continue</p>
//           <input type="password" placeholder='Enter the Password' value={passwordInput}
//             // every time you type — update passwordInput 
//             onChange={(e) => setPasswordInput(e.target.value)}
//             // pressing Enter also works!
//             onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()} />

//           {/* show error only if passwordError is not empty */}
//           {passwordError && <p className="admin-error">{passwordError}</p>}

//           <button onClick={handlePasswordSubmit}>
//             Login to Admin 🔓
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // const [activeTab, setActiveTab] = useState('inventory');
//   return (
//     <div className="admin-page">

//       {/* HEADER */}
//       <div className="admin-header">
//         <h1>🍽️Mannat catering- Admin Dashboard</h1>
//         <p>Manage your catering business here</p>

//         {/* STATS — 4 number cards at the top */}
//         <div className="admin-stats">

//           <div className="stat-card">
//             {/* orders.length = number of orders in array */}
//             <h3>{orders.length}</h3>
//             <p>Total Orders</p>
//           </div>

//           <div className="stat-card">
//             <h3>{customers.length}</h3>
//             <p>Customers</p>
//           </div>

//           <div className="stat-card">
//             <h3>{inventory.length}</h3>
//             <p>Inventory Items</p>
//           </div>

//           <div className="stat-card">
//             {/* filter only successful payments */}
//             <h3>{payments.filter(p => p.payment_status === 'success').length}</h3>
//             <p>Payments Done</p>
//           </div>

//         </div>

//       </div>

//       {/* TAB BUTTONS — switching between sections */}
//       <div className="admin-tabs">
//         {/* 
//           className={activeTab === 'orders' ? 'active' : ''}
//           This means:
//           IF activeTab is 'orders' → add class 'active' (purple)
//           IF not → no class (grey)
//         */}

//         <button className={activeTab === 'orders' ? 'active' : ''}
//           onClick={() => setActiveTab('orders')}>
//           📋Orders
//         </button>

//         <button className={activeTab === 'customers' ? 'active' : ''}
//           onClick={() => setActiveTab('customers')}>
//           🛃Customers
//         </button>

//         <button className={activeTab === 'inventory' ? 'active' : ''}
//           onClick={() => setActiveTab('inventory')}>
//           📦Inventory
//         </button>

//         <button className={activeTab === 'payments' ? 'active' : ''}
//           onClick={() => setActiveTab('payments')}>
//           💳Payments
//         </button>
//       </div>

//       {/* CONTENT AREA — we will add tables here next */}
//       {/* CONTENT AREA */}
//       <div className="admin-content">

//         {loading && <p className="loading">Loading... ⏳</p>}

//         {activeTab === 'orders' && (
//           <div>
//             <h2>All Orders ({orders.length})</h2>
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Customer</th>
//                   <th>Event Type</th>
//                   <th>Event Date</th>
//                   <th>Guests</th>
//                   <th>Total</th>
//                   <th>Advance</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map(function (order) {
//                   return (
//                     <tr key={order.id}>
//                       <td>#{order.id}</td>
//                       <td>
//                         {order.full_name}<br />
//                         <small>{order.phone}</small>
//                       </td>
//                       <td>{order.event_type}</td>
//                       <td>{new Date(order.event_date).toLocaleDateString()}</td>
//                       <td>{order.num_of_guests}</td>
//                       <td>₹{order.total_amount}</td>
//                       <td>₹{order.advance_amount}</td>
//                       <td>
//                         <span className={`status-badge ${order.order_status}`}>
//                           {order.order_status}
//                         </span>
//                       </td>
//                       <td>
//                         <select
//                           value={order.order_status}
//                           onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="confirmed">Confirmed</option>
//                           <option value="completed">Completed</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {activeTab === 'customers' && (
//           <div>
//             <h2>All Customers ({customers.length})</h2>
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Address</th>
//                   <th>Joined</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.map(function (customer) {
//                   return (
//                     <tr key={customer.id}>
//                       <td>#{customer.id}</td>
//                       <td>{customer.full_name}</td>
//                       <td>{customer.email}</td>
//                       <td>{customer.phone}</td>
//                       <td>{customer.address}</td>
//                       <td>{new Date(customer.created_at).toLocaleDateString()}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {activeTab === 'inventory' && (
//           <div>
//             <h2>Inventory Management</h2>

//             {/* ── ADD NEW ITEM FORM ── */}
//             <div className="add-item-form">
//               <h3>➕ Add New Item</h3>
//               <div className="form-row">
//                 <input
//                   name="item_name"
//                   placeholder="Item Name"
//                   value={newItem.item_name}
//                   onChange={handleInventoryChange}
//                 />
//                 <input
//                   name="category"
//                   placeholder="Category"
//                   value={newItem.category}
//                   onChange={handleInventoryChange}
//                 />
//                 <input
//                   name="quantity"
//                   type="number"
//                   placeholder="Quantity"
//                   value={newItem.quantity}
//                   onChange={handleInventoryChange}
//                 />
//                 <input
//                   name="unit"
//                   placeholder="Unit (kg/L/pcs)"
//                   value={newItem.unit}
//                   onChange={handleInventoryChange}
//                 />
//                 <input
//                   name="minimum_stock"
//                   type="number"
//                   placeholder="Min Stock"
//                   value={newItem.minimum_stock}
//                   onChange={handleInventoryChange}
//                 />
//                 <input
//                   name="price_per_unit"
//                   type="number"
//                   placeholder="Price per unit"
//                   value={newItem.price_per_unit}
//                   onChange={handleInventoryChange}
//                 />
//                 <button className="add-btn" onClick={addInventoryItem}>
//                   Add ➕
//                 </button>
//               </div>
//             </div>

//             {/* ── INVENTORY TABLE ── */}
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Item Name</th>
//                   <th>Category</th>
//                   <th>Quantity</th>
//                   <th>Unit</th>
//                   <th>Min Stock</th>
//                   <th>Price/Unit</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inventory.map(function (item) {
//                   // check if stock is below minimum
//                   const isLowStock = item.quantity <= item.minimum_stock;
//                   return (
//                     <tr key={item.id} className={isLowStock ? 'low-stock' : ''}>
//                       <td>#{item.id}</td>
//                       <td>{item.item_name}</td>
//                       <td>{item.category}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.unit}</td>
//                       <td>{item.minimum_stock}</td>
//                       <td>₹{item.price_per_unit}</td>
//                       <td>
//                         {isLowStock
//                           ? <span className="low-badge">⚠️ Low Stock</span>
//                           : <span className="ok-badge">✅ OK</span>
//                         }
//                       </td>
//                       <td>
//                         <button
//                           className="delete-btn"
//                           onClick={() => deleteInventoryItem(item.id)}
//                         >
//                           🗑️ Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {activeTab === 'payments' && (
//           <div>
//             <h2>All Payments ({payments.length})</h2>
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Customer</th>
//                   <th>Event Type</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.length === 0 ? (
//                   // show this message if no payments yet
//                   <tr>
//                     <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
//                       No payments yet 💳
//                     </td>
//                   </tr>
//                 ) : (
//                   payments.map(function (payment) {
//                     return (
//                       <tr key={payment.id}>
//                         <td>#{payment.id}</td>
//                         <td>{payment.full_name}</td>
//                         <td>{payment.event_type}</td>
//                         <td>₹{payment.amount}</td>
//                         <td>
//                           <span className={`status-badge ${payment.payment_status}`}>
//                             {payment.payment_status}
//                           </span>
//                         </td>
//                         <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//       </div>

//     </div>
//   );
// }
// export default Admin;


// Admin.jsx — Mannat Caterers Internal Dashboard
// Private route — no SEO indexing

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';


function Admin() {

  // ── AUTH STATE (unchanged) ──
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput,   setPasswordInput]   = useState('');
  const [passwordError,   setPasswordError]   = useState('');
  const ADMIN_PASSWORD = 'mannat2026';

  const [activeTab,   setActiveTab]   = useState('orders');

  // ── DATA STATE (unchanged) ──
  const [orders,    setOrders]    = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [payments,  setPayments]  = useState([]);
  const [loading,   setLoading]   = useState(false);

  // ── AUTH HANDLER (unchanged) ──
  function handlePasswordSubmit() {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setPasswordError('❌ Wrong password. Try again!');
    }
  }

  // ── FETCH ALL DATA (unchanged) ──
  function fetchAllData() {
    setLoading(true);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    Promise.all([
      axios.get('http://localhost:5000/orders/all', config),
      axios.get('http://localhost:5000/customers/all', config),
      axios.get('http://localhost:5000/inventory/all', config),
      axios.get('http://localhost:5000/payments/all', config)
    ])
      .then(function ([ordersRes, customersRes, inventoryRes, paymentsRes]) {
        console.log("✅ Orders:", ordersRes.data);
        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
        setInventory(inventoryRes.data);
        setPayments(paymentsRes.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("❌ Error:", error.response?.data);
        setLoading(false);
      });
  }

  // ── UPDATE ORDER STATUS (unchanged) ──
  function updateOrderStatus(orderId, newStatus) {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/orders/status/${orderId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` }}
    ).then(function() { fetchAllData(); });

    axios.put(`http://localhost:5000/orders/status/${orderId}`, {
      order_status: newStatus
    }).then(function () {
      fetchAllData();
      alert('✅ Order status updated!');
    });
  }

  // ── INVENTORY FORM STATE (unchanged) ──
  const [newItem, setNewItem] = useState({
    item_name: '', category: '', quantity: '',
    unit: '', minimum_stock: '', price_per_unit: ''
  });

  function handleInventoryChange(e) {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  function addInventoryItem() {
    if (!newItem.item_name || !newItem.quantity) {
      alert('Please fill item name and quantity!');
      return;
    }
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/inventory/add', newItem,
      { headers: { Authorization: `Bearer ${token}` }}
    ).then(function() {
      alert('✅ Item added!');
      fetchAllData();
      setNewItem({ item_name: '', category: '', quantity: '', unit: '', minimum_stock: '', price_per_unit: '' });
    });
  }

  function deleteInventoryItem(itemId) {
    if (window.confirm('Are you sure you want to delete?')) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5000/inventory/delete/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      ).then(function() { fetchAllData(); });
    }
  }

  // ── EFFECT (unchanged) ──
  useEffect(() => {
    if (isAuthenticated) { fetchAllData(); }
  }, [isAuthenticated]);

  // ══════════════════════════════════════
  // LOGIN SCREEN
  // ══════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">

          <div className="login-logo">🍽️</div>

          <h2>Admin Access</h2>
          <p>Sign in to the Mannat Caterers dashboard</p>

          <div className="login-field">
            <span className="login-field-icon">🔑</span>
            <input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              autoFocus
            />
          </div>

          {passwordError && (
            <p className="admin-error">{passwordError}</p>
          )}

          <button onClick={handlePasswordSubmit}>
            Sign In →
          </button>

        </div>
      </div>
    );
  }

  // ── NAV CONFIG ──
  const NAV_ITEMS = [
    { id: 'orders',    icon: '📋', label: 'Orders',    count: orders.length },
    { id: 'customers', icon: '👥', label: 'Customers', count: customers.length },
    { id: 'inventory', icon: '📦', label: 'Inventory', count: inventory.length },
    { id: 'payments',  icon: '💳', label: 'Payments',  count: payments.length },
  ];

  const PAGE_TITLES = {
    orders:    { title: 'Orders',    subtitle: 'Manage all catering bookings' },
    customers: { title: 'Customers', subtitle: 'View registered customer accounts' },
    inventory: { title: 'Inventory', subtitle: 'Track and manage stock levels' },
    payments:  { title: 'Payments',  subtitle: 'Monitor all payment transactions' },
  };

  // ══════════════════════════════════════
  // MAIN DASHBOARD
  // ══════════════════════════════════════
  return (
    <div className="admin-page">

      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar" role="navigation" aria-label="Admin navigation">

        <div className="sidebar-brand">
          <div className="sidebar-brand-logo">🍽️</div>
          <div className="sidebar-brand-name">Mannat Caterers</div>
          <div className="sidebar-brand-sub">Admin Dashboard</div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Management</div>

          {NAV_ITEMS.map(function(item) {
            return (
              <button
                key={item.id}
                className={`sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <span className="sidebar-btn-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
                <span className="sidebar-btn-badge">{item.count}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">👤</div>
            <div>
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Full access</div>
            </div>
          </div>
        </div>

      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="admin-main">

        {/* Top bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1>{PAGE_TITLES[activeTab].title}</h1>
            <p>{PAGE_TITLES[activeTab].subtitle}</p>
          </div>
          <div className="topbar-right">
            <span className="topbar-dot" title="Connected"></span>
            <button className="topbar-refresh-btn" onClick={fetchAllData}>
              ↻ Refresh
            </button>
          </div>
        </header>

        {/* Stat cards */}
        <div className="admin-stats" role="region" aria-label="Summary statistics">
          <div className="stat-card">
            <div className="stat-card-icon" aria-hidden="true">📋</div>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" aria-hidden="true">👥</div>
            <h3>{customers.length}</h3>
            <p>Customers</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" aria-hidden="true">📦</div>
            <h3>{inventory.length}</h3>
            <p>Inventory Items</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" aria-hidden="true">✅</div>
            <h3>{payments.filter(p => p.payment_status === 'success').length}</h3>
            <p>Payments Done</p>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">

          {loading && (
            <p className="loading" role="status" aria-live="polite">
              <span aria-hidden="true">⏳</span> Loading data…
            </p>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <div>
              <div className="page-heading">
                <div>
                  <h2>All Orders</h2>
                  <p>Every booking across all events</p>
                </div>
                <span className="page-heading-count">{orders.length} total</span>
              </div>

              <div className="table-card">
                <table className="admin-table" aria-label="Orders list">
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
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(function (order) {
                      return (
                        <tr key={order.id}>
                          <td><span className="cell-id">#{order.id}</span></td>
                          <td>
                            <span className="cell-name">
                              {order.full_name}
                              <small>{order.phone}</small>
                            </span>
                          </td>
                          <td>{order.event_type}</td>
                          <td>{new Date(order.event_date).toLocaleDateString()}</td>
                          <td>{order.num_of_guests}</td>
                          <td><span className="cell-amount">₹{order.total_amount}</span></td>
                          <td>₹{order.advance_amount}</td>
                          <td>
                            <span className={`status-badge ${order.order_status}`}>
                              {order.order_status}
                            </span>
                          </td>
                          <td>
                            <select
                              className="status-select"
                              value={order.order_status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              aria-label={`Update status for order #${order.id}`}
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
            </div>
          )}

          {/* ── CUSTOMERS TAB ── */}
          {activeTab === 'customers' && (
            <div>
              <div className="page-heading">
                <div>
                  <h2>All Customers</h2>
                  <p>Registered accounts on the platform</p>
                </div>
                <span className="page-heading-count">{customers.length} total</span>
              </div>

              <div className="table-card">
                <table className="admin-table" aria-label="Customers list">
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
                          <td><span className="cell-id">#{customer.id}</span></td>
                          <td><span className="cell-name">{customer.full_name}</span></td>
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
            </div>
          )}

          {/* ── INVENTORY TAB ── */}
          {activeTab === 'inventory' && (
            <div>
              <div className="page-heading">
                <div>
                  <h2>Inventory Management</h2>
                  <p>Track stock levels and add new items</p>
                </div>
                <span className="page-heading-count">{inventory.length} items</span>
              </div>

              {/* Add new item form */}
              <div className="add-item-form">
                <div className="add-item-form-header">
                  <span aria-hidden="true">➕</span>
                  <h3>Add New Item</h3>
                </div>
                <div className="form-row">
                  <input
                    name="item_name"
                    placeholder="Item Name"
                    value={newItem.item_name}
                    onChange={handleInventoryChange}
                    aria-label="Item name"
                  />
                  <input
                    name="category"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={handleInventoryChange}
                    aria-label="Category"
                  />
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={handleInventoryChange}
                    aria-label="Quantity"
                  />
                  <input
                    name="unit"
                    placeholder="Unit (kg / L / pcs)"
                    value={newItem.unit}
                    onChange={handleInventoryChange}
                    aria-label="Unit"
                  />
                  <input
                    name="minimum_stock"
                    type="number"
                    placeholder="Min Stock"
                    value={newItem.minimum_stock}
                    onChange={handleInventoryChange}
                    aria-label="Minimum stock"
                  />
                  <input
                    name="price_per_unit"
                    type="number"
                    placeholder="Price per unit"
                    value={newItem.price_per_unit}
                    onChange={handleInventoryChange}
                    aria-label="Price per unit"
                  />
                  <button className="add-btn" onClick={addInventoryItem}>
                    ➕ Add Item
                  </button>
                </div>
              </div>

              {/* Inventory table */}
              <div className="table-card">
                <table className="admin-table" aria-label="Inventory list">
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
                      const isLowStock = item.quantity <= item.minimum_stock;
                      return (
                        <tr key={item.id} className={isLowStock ? 'low-stock' : ''}>
                          <td><span className="cell-id">#{item.id}</span></td>
                          <td><span className="cell-name">{item.item_name}</span></td>
                          <td>{item.category}</td>
                          <td><span className="cell-amount">{item.quantity}</span></td>
                          <td>{item.unit}</td>
                          <td>{item.minimum_stock}</td>
                          <td>₹{item.price_per_unit}</td>
                          <td>
                            {isLowStock
                              ? <span className="low-badge">⚠ Low Stock</span>
                              : <span className="ok-badge">✓ OK</span>
                            }
                          </td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() => deleteInventoryItem(item.id)}
                              aria-label={`Delete ${item.item_name}`}
                            >
                              🗑 Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAYMENTS TAB ── */}
          {activeTab === 'payments' && (
            <div>
              <div className="page-heading">
                <div>
                  <h2>All Payments</h2>
                  <p>Transaction history across all bookings</p>
                </div>
                <span className="page-heading-count">{payments.length} total</span>
              </div>

              <div className="table-card">
                <table className="admin-table" aria-label="Payments list">
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
                      <tr>
                        <td colSpan="6">
                          <div className="table-empty">
                            <div className="table-empty-icon">💳</div>
                            <p>No payments recorded yet</p>
                            <small>Payments will appear here once bookings are confirmed</small>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      payments.map(function (payment) {
                        return (
                          <tr key={payment.id}>
                            <td><span className="cell-id">#{payment.id}</span></td>
                            <td><span className="cell-name">{payment.full_name}</span></td>
                            <td>{payment.event_type}</td>
                            <td><span className="cell-amount">₹{payment.amount}</span></td>
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
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;
