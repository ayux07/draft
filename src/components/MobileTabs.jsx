import React from 'react';
import { C, ICONS } from '../data/theme';

export const MobileTabs = ({ nav, page, cartCount, setCartOpen }) => {
  const Tab = ({ k, icon, label, active }) => (
    <button 
      onClick={() => k === 'cart' ? setCartOpen(true) : nav(k)}
      style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', gap: '0.25rem', background: active ? C.yellow : '#fff', 
        border: 'none', borderTop: `2px solid ${C.border}`, position: 'relative',
        padding: '0.5rem 0'
      }}
    >
      {ICONS[icon](20)}
      <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>{label}</span>
      {k === 'cart' && cartCount > 0 && (
        <span style={{ position: 'absolute', top: '5px', right: '25%', background: C.red, color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '0.1rem 0.3rem', border: `1.5px solid ${C.border}` }}>
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <div className="nav-mobile" style={{ 
      position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', 
      background: '#fff', display: 'flex', zIndex: 1000, borderTop: `3px solid ${C.border}`,
      boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
    }}>
      <Tab k="home" icon="user" label="HOME" active={page === 'home'} />
      <Tab k="browse" icon="search" label="BROWSE" active={page === 'browse'} />
      <Tab k="cart" icon="cart" label="CART" cartCount={cartCount} />
      <Tab k="wishlist" icon="heart" label="SAVED" active={page === 'wishlist'} />
    </div>
  );
};
