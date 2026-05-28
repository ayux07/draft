import React, { useState } from 'react';
import { C, ICONS } from '../data/theme';

export const Navbar = ({ nav, cartCount, wishlistCount, setLoginOpen, setCartOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const Link = ({ k, label }) => (
    <button 
      onClick={() => { nav(k); setMenuOpen(false); }}
      className="label-sm"
      style={{ 
        background: 'none', border: 'none', cursor: 'pointer', color: C.ink, 
        fontWeight: 700, fontSize: '0.9rem', padding: '0.5rem',
        borderBottom: '3px solid transparent',
        transition: 'all 0.2s'
      }}
      onMouseEnter={e => e.target.style.borderBottom = `3px solid ${C.yellow}`}
      onMouseLeave={e => e.target.style.borderBottom = '3px solid transparent'}
    >
      {label}
    </button>
  );

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', borderBottom: `3px solid ${C.border}` }}>
      <div className="ctr" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 
            onClick={() => nav('home')}
            style={{ fontFamily: 'Bangers', fontSize: '2rem', cursor: 'pointer', letterSpacing: '2px', color: C.ink }}
          >
            INDREV
          </h1>
          
          <div className="nav-desktop" style={{ display: 'flex', gap: '1rem' }}>
            <Link k="browse" label="BROWSE" />
            <Link k="stores" label="STORES" />
            <Link k="how" label="HOW IT WORKS" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => nav('search')} className="neo-btn nav-desktop" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.5rem', display: 'flex', boxShadow: `2px 2px 0 ${C.shadow}` }}>
            {ICONS.search(20)}
          </button>
          
          <button 
            onClick={() => nav('wishlist')} 
            className="neo-btn nav-desktop" 
            style={{ 
              background: C.bg, border: `2px solid ${C.border}`, padding: '0.5rem', display: 'flex', 
              boxShadow: `2px 2px 0 ${C.shadow}`, position: 'relative' 
            }}
          >
            {ICONS.heart(20)}
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: C.red, color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.3rem', border: `2px solid ${C.border}` }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCartOpen(true)} 
            className="neo-btn nav-desktop" 
            style={{ 
              background: C.yellow, border: `3px solid ${C.border}`, padding: '0.5rem 0.8rem', 
              display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: `3px 3px 0 ${C.shadow}` 
            }}
          >
            {ICONS.cart(22)}
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{cartCount}</span>
          </button>

          <button className="nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
            {menuOpen ? ICONS.close(28) : ICONS.menu(28)}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, top: '70px', background: '#fff', zIndex: 999, display: 'flex', flexDirection: 'column', padding: '2rem', gap: '2rem' }}>
          <button onClick={() => { nav('browse'); setMenuOpen(false); }} style={{ fontFamily: 'Bangers', fontSize: '2.5rem', textAlign: 'left', border: 'none', background: 'none' }}>BROWSE</button>
          <button onClick={() => { nav('stores'); setMenuOpen(false); }} style={{ fontFamily: 'Bangers', fontSize: '2.5rem', textAlign: 'left', border: 'none', background: 'none' }}>STORES</button>
          <button onClick={() => { nav('how'); setMenuOpen(false); }} style={{ fontFamily: 'Bangers', fontSize: '2.5rem', textAlign: 'left', border: 'none', background: 'none' }}>HOW IT WORKS</button>
          <button onClick={() => { setLoginOpen(true); setMenuOpen(false); }} style={{ fontFamily: 'Bangers', fontSize: '2.5rem', textAlign: 'left', border: 'none', background: 'none', color: C.blue }}>LOG IN</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
