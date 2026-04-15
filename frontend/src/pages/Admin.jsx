import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Package, Calendar, Users, CreditCard, DollarSign, TrendingUp, Trash2 } from 'lucide-react';
import './Admin.css';

/* Auth header helper — reads JWT token from localStorage */
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
}

function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const ADMIN_PW = 'mannat2026';

  const [tab, setTab] = useState('analytics');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    item_name: '', category: '', quantity: '', unit: '', minimum_stock: '', price_per_unit: ''
  });

  // Expanded booking detail
  const [expandedOrder, setExpandedOrder] = useState(null);

  function handleLogin() {
    if (pw === ADMIN_PW) { setIsAuth(true); setPw(''); }
    else { setPwError('Incorrect password'); }
  }

  function fetchAll() {
    setLoading(true);
    const auth = getAuthHeaders();
    Promise.all([
      axios.get('http://localhost:5000/orders/all', auth),
      axios.get('http://localhost:5000/customers/all', auth),
      axios.get('http://localhost:5000/inventory/all', auth),
      axios.get('http://localhost:5000/payments/all', auth),
    ])
    .then(([o, c, i, p]) => {
      setOrders(o.data); setCustomers(c.data); setInventory(i.data); setPayments(p.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }

  useEffect(() => { if (isAuth) fetchAll(); }, [isAuth]);

  function updateStatus(orderId, status) {
    axios.put(`http://localhost:5000/orders/status/${orderId}`, { order_status: status }, getAuthHeaders())
      .then(() => { fetchAll(); });
  }

  function handleInvChange(e) {
    setNewItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addItem() {
    axios.post('http://localhost:5000/inventory/add', newItem, getAuthHeaders())
      .then(() => { fetchAll(); setNewItem({ item_name: '', category: '', quantity: '', unit: '', minimum_stock: '', price_per_unit: '' }); })
      .catch(() => alert('Error adding item'));
  }

  function deleteItem(id) {
    if (window.confirm('Delete this item?')) {
      axios.delete(`http://localhost:5000/inventory/delete/${id}`, getAuthHeaders())
        .then(() => fetchAll())
        .catch(() => alert('Error deleting item'));
    }
  }

  // Stats
  const totalRev = orders.reduce((s, o) => s + (parseFloat(o.total_amount) || 0), 0);
  const avgOrder = orders.length > 0 ? totalRev / orders.length : 0;
  const successPay = payments.filter(p => p.payment_status === 'success').length;

  // Login
  if (!isAuth) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__icon">
            <svg width="32" height="32" fill="none" stroke="var(--green-600)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h2>Admin Dashboard</h2>
          <p>Enter your password to continue</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {pwError && <span className="admin-login__error">{pwError}</span>}
          <button onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'analytics', label: 'Analytics', icon: <BarChart size={18} /> },
    { key: 'inventory', label: 'Inventory', icon: <Package size={18} /> },
    { key: 'bookings', label: 'Bookings', icon: <Calendar size={18} /> },
    { key: 'customers', label: 'Customers', icon: <Users size={18} /> },
    { key: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="admin">
      {/* Header */}
      <header className="admin__header">
        <div className="admin__header-inner">
          <div>
            <h1>Dashboard</h1>
            <p>Mannat Caterers Management</p>
          </div>
          <button className="admin__refresh" onClick={fetchAll}>↻ Refresh</button>
        </div>
        <nav className="admin__tabs" aria-label="Dashboard navigation">
          {tabs.map(t => (
            <button key={t.key} className={tab === t.key ? 'admin__tab--active' : ''} onClick={() => setTab(t.key)}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="admin__body">
        {loading && <div className="admin__loading"><div className="spinner"></div></div>}

        {/* ── Analytics ── */}
        {tab === 'analytics' && (
          <div className="admin__section">
            <div className="stats-grid">
              {[
                { label: 'Total Bookings', value: orders.length, icon: <Calendar size={24} />, color: 'blue' },
                { label: 'Total Revenue', value: `₹${totalRev.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'green' },
                { label: 'Customers', value: customers.length, icon: <Users size={24} />, color: 'purple' },
                { label: 'Avg Order Value', value: `₹${avgOrder.toFixed(0)}`, icon: <TrendingUp size={24} />, color: 'orange' },
                { label: 'Payments Done', value: successPay, icon: <CreditCard size={24} />, color: 'green' },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className={`stat-card__icon stat-card__icon--${s.color}`}>{s.icon}</div>
                  <div className="stat-card__info">
                    <span className="stat-card__label">{s.label}</span>
                    <span className="stat-card__value">{s.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <h3>Revenue Trend</h3>
                <div className="bar-chart">
                  {[65, 45, 75, 55, 80, 60, 90, 70, 85, 50, 95, 75].map((h, i) => (
                    <div key={i} className="bar-chart__bar" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="bar-chart__labels">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
              <div className="chart-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {orders.slice(0, 5).map((o, i) => (
                    <div key={i} className="activity-item">
                      <span className="activity-item__dot"></span>
                      <div>
                        <strong>{o.event_type} — {o.full_name}</strong>
                        <span>₹{o.total_amount} · {o.order_status}</span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="no-data">No recent activity</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Inventory ── */}
        {tab === 'inventory' && (
          <div className="admin__section">
            <div className="admin__section-head">
              <h2>Inventory Management</h2>
            </div>
            <div className="form-card">
              <h3>Add New Item</h3>
              <div className="form-card__grid">
                <input name="item_name" placeholder="Item Name" value={newItem.item_name} onChange={handleInvChange} />
                <input name="category" placeholder="Category" value={newItem.category} onChange={handleInvChange} />
                <input name="quantity" type="number" placeholder="Quantity" value={newItem.quantity} onChange={handleInvChange} />
                <input name="unit" placeholder="Unit (kg/L/pcs)" value={newItem.unit} onChange={handleInvChange} />
                <input name="minimum_stock" type="number" placeholder="Min Stock" value={newItem.minimum_stock} onChange={handleInvChange} />
                <input name="price_per_unit" type="number" placeholder="Price/Unit" value={newItem.price_per_unit} onChange={handleInvChange} />
              </div>
              <button className="btn btn--primary btn--sm" onClick={addItem}>+ Add Item</button>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>Item</th><th>Category</th><th>Qty</th><th>Unit</th><th>Min Stock</th><th>Price/Unit</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.id}>
                      <td className="fw-600">{item.item_name}</td>
                      <td><span className="badge badge--green">{item.category}</span></td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.minimum_stock}</td>
                      <td>₹{item.price_per_unit}</td>
                      <td>
                        <span className={`badge ${item.quantity <= item.minimum_stock ? 'badge--amber' : 'badge--green'}`}>
                          {item.quantity <= item.minimum_stock ? 'Low Stock' : 'OK'}
                        </span>
                      </td>
                      <td><button className="btn-icon btn-icon--danger" onClick={() => deleteItem(item.id)}><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inventory.length === 0 && <p className="no-data">No inventory items</p>}
            </div>
          </div>
        )}

        {/* ── Bookings ── */}
        {tab === 'bookings' && (
          <div className="admin__section">
            <div className="admin__section-head">
              <h2>All Bookings</h2>
              <span className="count-badge">{orders.length} total</span>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Customer</th><th>Event</th><th>Date</th><th>Guests</th><th>Total</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <React.Fragment key={o.id}>
                      <tr
                        className={expandedOrder === o.id ? 'row--expanded' : ''}
                        onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="td-id">#{o.id}</td>
                        <td>
                          <div className="td-customer">
                            <strong>{o.full_name}</strong>
                            <span>{o.phone}</span>
                          </div>
                        </td>
                        <td><span className="badge badge--blue">{o.event_type}</span></td>
                        <td>{new Date(o.event_date).toLocaleDateString()}</td>
                        <td>{o.num_of_guests}</td>
                        <td className="fw-600 text-green">₹{parseFloat(o.total_amount).toLocaleString()}</td>
                        <td><span className={`badge badge--${o.order_status}`}>{o.order_status}</span></td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <select className="status-select" value={o.order_status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                      {expandedOrder === o.id && (
                        <tr className="detail-row">
                          <td colSpan="8">
                            <div className="detail-grid">
                              <div className="detail-block">
                                <h4>User Data</h4>
                                <p><strong>Name:</strong> {o.full_name}</p>
                                <p><strong>Email:</strong> {o.email}</p>
                                <p><strong>Phone:</strong> {o.phone}</p>
                                <p><strong>Address:</strong> {o.address}</p>
                              </div>
                              <div className="detail-block">
                                <h4>Event Details</h4>
                                <p><strong>Type:</strong> {o.event_type}</p>
                                <p><strong>Date:</strong> {new Date(o.event_date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {o.event_location}</p>
                                <p><strong>Guests:</strong> {o.num_of_guests}</p>
                              </div>
                              <div className="detail-block">
                                <h4>Billing</h4>
                                <p><strong>Total:</strong> ₹{parseFloat(o.total_amount).toLocaleString()}</p>
                                <p><strong>Advance:</strong> ₹{parseFloat(o.advance_amount).toLocaleString()}</p>
                                <p><strong>Balance:</strong> ₹{parseFloat(o.balance_amount).toLocaleString()}</p>
                                <p><strong>Menu IDs:</strong> {o.menu_selected}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && <p className="no-data">No bookings yet</p>}
            </div>
          </div>
        )}

        {/* ── Customers ── */}
        {tab === 'customers' && (
          <div className="admin__section">
            <div className="admin__section-head">
              <h2>All Customers</h2>
              <span className="count-badge">{customers.length} total</span>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Joined</th></tr></thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.id}>
                      <td className="td-id">#{c.id}</td>
                      <td className="fw-600">{c.full_name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.address}</td>
                      <td>{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customers.length === 0 && <p className="no-data">No customers</p>}
            </div>
          </div>
        )}

        {/* ── Payments ── */}
        {tab === 'payments' && (
          <div className="admin__section">
            <div className="admin__section-head">
              <h2>All Payments</h2>
              <span className="count-badge">{payments.length} total</span>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>ID</th><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id}>
                      <td className="td-id">#{p.id}</td>
                      <td className="td-id">#{p.order_id}</td>
                      <td>{p.customer_name || 'N/A'}</td>
                      <td className="fw-600 text-green">₹{p.amount}</td>
                      <td><span className={`badge badge--${p.payment_status === 'success' ? 'completed' : p.payment_status}`}>{p.payment_status}</span></td>
                      <td>{p.payment_date ? new Date(p.payment_date).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {payments.length === 0 && <p className="no-data">No payments</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
