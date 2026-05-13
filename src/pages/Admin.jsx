import React, { useState } from 'react';
import { C, BTNP, BTNG, BTND, INP } from '../data/theme';
import Price from '../components/common/Price';

export const Admin = ({ nav, dbProducts, setDbProducts, orders, setOrders, dbUsers, setDbUsers, featured, setFeatured }) => {
  const [adminTab, setAdminTab] = useState('dashboard');

  const totalRev = dbProducts.reduce((acc, p) => acc + p.price, 0);

  const toggleProduct = (id) => {
    setDbProducts(prev => prev.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p));
  };
  const deleteProduct = (id) => {
    setDbProducts(prev => prev.filter(p => p.id !== id));
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
            <button key={t} className="neo-btn" style={{ ...(adminTab === t ? BTNP : BTNG), textTransform: 'uppercase' }} onClick={() => setAdminTab(t)}>
              {t}
            </button>
          ))}
          <button className="neo-btn" style={{...BTNG, marginLeft: 'auto'}} onClick={() => nav('home')}>EXIT ADMIN</button>
        </div>

        {adminTab === 'dashboard' && (
          <div className="g-3">
            {[
              { l: 'TOTAL REVENUE', v: <Price n={totalRev} /> },
              { l: 'INVENTORY COUNT', v: dbProducts.length }
            ].map((s, i) => (
              <div key={i} className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
                <h3 className="tc" style={{ color: C.muted, marginBottom: '1rem' }}>{s.l}</h3>
                <div className="tp">{s.v}</div>
              </div>
            ))}
          </div>
        )}

        {adminTab === 'products' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>PRODUCTS DIRECTORY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbProducts.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: p.hidden ? C.bg : '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="tb" style={{ fontWeight: 600 }}>{p.name}</span>
                    <Price n={p.price} style={{ fontSize: '1rem' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
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
