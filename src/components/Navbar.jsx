import React, { useState } from 'react';
import { C, BTNG, BTNP, INP } from '../data/theme';

/**
 * Global Navigation Bar
 */
export const Navbar = ({ nav, page, cartCount, openLogin, openCart, userAuthed, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const links = [
    { k: 'browse', l: 'Browse' },
    { k: 'categories', l: 'Categories' },
    { k: 'how', l: 'How It Works' }
  ];

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: C.surface, borderBottom: `3px solid ${C.border}` }}>
        <div className="ctr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="nav-mobile" onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: C.ink }}>☰</button>
            <div onClick={() => nav('home')} style={{ cursor: 'pointer' }}>
              <h1 className="ts" style={{ margin: 0, cursor: 'pointer' }}>INDREV</h1>
            </div>
          </div>
          
          <div className="nav-desktop" style={{ gap: '2rem', alignItems: 'center' }}>
            {links.map(x => (
              <div 
                key={x.k} 
                onClick={() => nav(x.k)} 
                style={{ cursor: 'pointer', fontWeight: 600, position: 'relative' }}>
                {x.l}
                {page === x.k && <div style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '4px', background: C.yellow }}></div>}
              </div>
            ))}
          </div>

          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && onSearch(searchQuery)}
              style={{...INP, width: '280px'}} 
            />
            <button className="neo-btn" style={{...BTNG, padding: '0.5rem'}} onClick={() => onSearch(searchQuery)}>
              🔍
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="neo-btn nav-desktop" style={{...BTNG, padding: '0.5rem 1rem'}} onClick={() => nav('wishlist')}>♥ SAVED</button>
            <button className="neo-btn nav-desktop" style={{...BTNG, padding: '0.5rem 1rem'}} onClick={openLogin}>{userAuthed ? 'ACCOUNT' : 'LOGIN'}</button>
            <button className="neo-btn" style={{...BTNP, padding: '0.5rem 1rem'}} onClick={openCart}>
              CART {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: C.surface, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div className="ctr" style={{ display: 'flex', justifyContent: 'flex-end', height: '70px', alignItems: 'center' }}>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: C.ink }}>×</button>
          </div>
          <div className="ctr" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 1rem' }}>
            <div onClick={() => { nav('home'); setMenuOpen(false); }} className="th" style={{ cursor: 'pointer' }}>HOME</div>
            {links.map(x => (
              <div key={x.k} onClick={() => { nav(x.k); setMenuOpen(false); }} className="th" style={{ cursor: 'pointer' }}>
                {x.l}
              </div>
            ))}
            <button className="neo-btn" style={{...BTNG, width: 'max-content', marginTop: '2rem'}} onClick={() => { openLogin(); setMenuOpen(false); }}>{userAuthed ? 'ACCOUNT' : 'LOGIN / SIGN UP'}</button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <div className="tab-bar">
        {[
          { k: 'home', l: 'HOME', icon: '🏠' },
          { k: 'browse', l: 'SHOP', icon: '🛍️' },
          { k: 'search', l: 'SEARCH', icon: '🔍' },
          { k: 'categories', l: 'CATEGORIES', icon: '📁' },
          { k: 'wishlist', l: 'SAVED', icon: '♥' }
        ].map(x => (
          <div key={x.k} onClick={() => nav(x.k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: page === x.k ? C.ink : C.muted }}>
            <span style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{x.icon}</span>
            <span className="label-sm" style={{ color: page === x.k ? C.ink : C.muted }}>{x.l}</span>
          </div>
        ))}
      </div>
      <div className="tab-bar-spacer"></div>
    </>
  );
};

export default Navbar;
