import React, { useState } from 'react';
import { C, BTNP, BTNG, BTND, INP } from '../data/theme';
import { GENDERS, CATS_BY_GENDER, CONDITIONS } from '../data/mockData';
import Price from '../components/common/Price';

export const Admin = ({ nav, dbProducts, setDbProducts, orders, setOrders, dbUsers, setDbUsers, featured, setFeatured }) => {
  const [adminTab, setAdminTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const initialForm = {
    name: '',
    price: '',
    gender: 'Men',
    cat: 'Suits',
    brand: '',
    size: '',
    cond: 'New',
    tag: '',
    color: '#000000'
  };
  const [form, setForm] = useState(initialForm);

  const totalRev = dbProducts.reduce((acc, p) => acc + p.price, 0);

  const toggleProduct = (id) => {
    setDbProducts(prev => prev.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p));
  };
  
  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDbProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const startEdit = (p) => {
    setEditingProduct(p);
    setForm({ ...p, tag: p.tag || '' });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setIsAdding(true);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: Number(form.price),
      tag: form.tag || null
    };

    if (editingProduct) {
      setDbProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...productData, id: p.id } : p));
    } else {
      const newId = Math.max(...dbProducts.map(p => p.id), 0) + 1;
      setDbProducts(prev => [...prev, { ...productData, id: newId }]);
    }
    
    setIsAdding(false);
    setEditingProduct(null);
  };

  const toggleOrder = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const nx = o.status === 'Pending' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Pending';
      return { ...o, status: nx };
    }));
  };

  const toggleUserBan = (id) => {
    setDbUsers(prev => prev.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
  };

  const toggleFeatured = (id) => {
    setFeatured(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 9) return prev;
      return [...prev, id];
    });
  };

  return (
    <div key="admin" style={{ animation: 'fadeIn 0.3s ease', background: C.bg, flex: 1, paddingBottom: '5rem' }}>
      <div className="ctr sec">
        <h1 className="tp" style={{ marginBottom: '2rem' }}>ADMIN PANEL</h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['dashboard', 'products', 'orders', 'users', 'content'].map(t => (
            <button key={t} className="neo-btn" style={{ ...(adminTab === t ? BTNP : BTNG), textTransform: 'uppercase' }} onClick={() => { setAdminTab(t); setIsAdding(false); setEditingProduct(null); }}>
              {t}
            </button>
          ))}
          <button className="neo-btn" style={{...BTNG, marginLeft: 'auto'}} onClick={() => nav('home')}>EXIT ADMIN</button>
        </div>

        {adminTab === 'dashboard' && (
          <div className="g-3">
            {[
              { l: 'TOTAL REVENUE', v: <Price n={totalRev} /> },
              { l: 'INVENTORY COUNT', v: dbProducts.length },
              { l: 'TOTAL ORDERS', v: orders.length }
            ].map((s, i) => (
              <div key={i} className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
                <h3 className="tc" style={{ color: C.muted, marginBottom: '1rem' }}>{s.l}</h3>
                <div className="tp">{s.v}</div>
              </div>
            ))}
          </div>
        )}

        {adminTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {(isAdding || editingProduct) ? (
              <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
                <h2 className="ts" style={{ marginBottom: '1.5rem' }}>{editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h2>
                <form onSubmit={saveProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Product Name</label>
                    <input type="text" required style={INP} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Price (INR)</label>
                    <input type="number" required style={INP} value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Brand</label>
                    <input type="text" required style={INP} value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Size</label>
                    <input type="text" required style={INP} value={form.size} onChange={e => setForm({...form, size: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Gender</label>
                    <select style={INP} value={form.gender} onChange={e => setForm({...form, gender: e.target.value, cat: CATS_BY_GENDER[e.target.value][0]})}>
                      {GENDERS.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Category</label>
                    <select style={INP} value={form.cat} onChange={e => setForm({...form, cat: e.target.value})}>
                      {CATS_BY_GENDER[form.gender].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Condition</label>
                    <select style={INP} value={form.cond} onChange={e => setForm({...form, cond: e.target.value})}>
                      {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Special Tag</label>
                    <select style={INP} value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}>
                      <option value="">None</option>
                      <option value="New">New</option>
                      <option value="Rare">Rare</option>
                      <option value="Featured">Featured</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="label-sm">Card Background Color</label>
                    <input type="color" style={{...INP, padding: '0.2rem', height: '48px'}} value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
                  </div>
                  
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="neo-btn" style={BTNP}>SAVE PRODUCT</button>
                    <button type="button" className="neo-btn" style={BTNG} onClick={() => { setIsAdding(false); setEditingProduct(null); }}>CANCEL</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 className="ts" style={{ margin: 0 }}>PRODUCTS DIRECTORY</h2>
                  <button className="neo-btn" style={BTNP} onClick={startAdd}>+ ADD NEW PRODUCT</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dbProducts.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: p.hidden ? C.bg : '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span className="tb" style={{ fontWeight: 600 }}>{p.name}</span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Price n={p.price} style={{ fontSize: '1rem' }} />
                          <span className="label-sm" style={{ color: C.muted }}>• {p.brand} • {p.cat}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => startEdit(p)}>
                          EDIT
                        </button>
                        <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleProduct(p.id)}>
                          {p.hidden ? 'UNHIDE' : 'HIDE'}
                        </button>
                        <button className="neo-btn" style={{...BTND, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => deleteProduct(p.id)}>
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {adminTab === 'orders' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>ORDERS DIRECTORY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 && <p className="tb">No orders yet.</p>}
              {orders.map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="tb" style={{ fontWeight: 600 }}>{o.buyer} ordered {o.product.name}</span>
                    <span className="label-sm" style={{ color: C.muted }}>Order #{o.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      background: o.status === 'Delivered' ? C.green : o.status === 'Pending' ? C.yellow : C.surface, 
                      color: C.ink, border: `2px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, padding: '0.25rem 0.5rem', fontWeight: 600, fontSize: '0.85rem' 
                    }}>
                      {o.status}
                    </span>
                    <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleOrder(o.id)}>
                      UPDATE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'users' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>USER ACCESS CONTROL</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbUsers.map(u => (
                <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <span className="tb" style={{ fontWeight: 600, textDecoration: u.banned ? 'line-through' : 'none' }}>{u.name} {u.banned && <span style={{ color: C.red }}>(BANNED)</span>}</span>
                  <button className="neo-btn" style={{...BTND, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleUserBan(u.id)}>
                    {u.banned ? 'UNBAN' : 'BAN'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'content' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>FEATURED PIECES (MAX 9)</h2>
            <p className="tb" style={{ marginBottom: '1rem', color: C.muted }}>Select products to display on the Home page.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbProducts.map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.5rem', border: `3px solid ${C.border}`, background: featured.includes(p.id) ? C.yellow : '#fff' }}>
                  <input type="checkbox" checked={featured.includes(p.id)} onChange={() => toggleFeatured(p.id)} style={{ width: '1.2rem', height: '1.2rem', accentColor: C.ink }} />
                  <span className="tb">{p.name} - {p.brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
