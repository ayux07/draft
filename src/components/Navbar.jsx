import React, { useState } from 'react';
import { C, ICONS } from '../data/theme';

export const Navbar = ({ nav, cartCount, wishlistCount, setLoginOpen, setCartOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (name) =>
    setOpenAccordion(openAccordion === name ? null : name);

  // Desktop nav link
  const Link = ({ k, label }) => (
    <button
      onClick={() => nav(k)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', color: C.ink,
        fontWeight: 700, fontSize: '0.9rem', padding: '0.5rem 0.75rem',
        borderBottom: '3px solid transparent', transition: 'border-color 0.2s',
        fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em'
      }}
      onMouseEnter={e => e.currentTarget.style.borderBottom = `3px solid ${C.yellow}`}
      onMouseLeave={e => e.currentTarget.style.borderBottom = '3px solid transparent'}
    >
      {label}
    </button>
  );

  // Drawer accordion category
  const AccordionItem = ({ id, label, children }) => {
    const isOpen = openAccordion === id;
    return (
      <div>
        <div
          onClick={() => toggleAccordion(id)}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', padding: '0.6rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{label}</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
        </div>
        {isOpen && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.6rem',
            padding: '0.75rem 0.75rem 0.5rem',
            background: 'rgba(0,0,0,0.18)', marginTop: '0.25rem'
          }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const DrawerLink = ({ label, dest = 'browse' }) => (
    <span
      onClick={() => { nav(dest); setMenuOpen(false); }}
      style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 500 }}
    >
      {label}
    </span>
  );

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', borderBottom: `3px solid ${C.border}` }}>

      {/* ── Promo Marquee Banner ── */}
      <div className="marquee-container">
        <div className="marquee-text">
          🛍 SHOP ₹2999+ AND GET A FREE DIY BRICK BOX &nbsp;•&nbsp; USE CODE: DIYBRICK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          🛍 SHOP ₹2999+ AND GET A FREE DIY BRICK BOX &nbsp;•&nbsp; USE CODE: DIYBRICK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          🛍 SHOP ₹2999+ AND GET A FREE DIY BRICK BOX &nbsp;•&nbsp; USE CODE: DIYBRICK
        </div>
      </div>

      {/* ── DESKTOP HEADER (hidden on mobile via !important CSS) ── */}
      <div
        className="nav-desktop ctr"
        style={{ height: '70px', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Left: Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1
            onClick={() => nav('home')}
            style={{ fontFamily: 'Bangers', fontSize: '2.2rem', cursor: 'pointer', letterSpacing: '2px', color: C.ink, margin: 0 }}
          >
            INDREV
          </h1>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <Link k="browse" label="Browse" />
            <Link k="categories" label="Categories" />
            <Link k="how" label="How It Works" />
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => nav('search')} className="neo-btn" style={{ background: C.bg, border: `3px solid ${C.border}`, padding: '0.45rem', display: 'flex', boxShadow: `3px 3px 0 ${C.shadow}` }}>
            {ICONS.search(20)}
          </button>

          <button onClick={() => nav('wishlist')} className="neo-btn" style={{ background: C.bg, border: `3px solid ${C.border}`, padding: '0.45rem', display: 'flex', boxShadow: `3px 3px 0 ${C.shadow}`, position: 'relative' }}>
            {ICONS.heart(20)}
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: '-7px', right: '-7px', background: C.red, color: '#fff', fontSize: '0.65rem', fontWeight: 800, minWidth: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid #fff` }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button onClick={() => setCartOpen(true)} className="neo-btn" style={{ background: C.yellow, border: `3px solid ${C.border}`, padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: `3px 3px 0 ${C.shadow}` }}>
            {ICONS.cart(20)}
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{cartCount}</span>
          </button>

          <button onClick={() => setLoginOpen(true)} className="neo-btn" style={{ background: C.surface, border: `3px solid ${C.border}`, padding: '0.45rem', display: 'flex', boxShadow: `3px 3px 0 ${C.shadow}` }}>
            {ICONS.user(20)}
          </button>
        </div>
      </div>

      {/* ── MOBILE HEADER (hidden on desktop via !important CSS) ── */}
      <div
        className="nav-mobile"
        style={{ height: '58px', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}
      >
        {/* Left: Hamburger + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: C.ink }}
          >
            {ICONS.menu(26)}
          </button>
          <button
            onClick={() => nav('search')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: C.ink }}
          >
            {ICONS.search(22)}
          </button>
        </div>

        {/* Center: Logo */}
        <h1
          onClick={() => nav('home')}
          style={{ fontFamily: 'Bangers', fontSize: '1.9rem', cursor: 'pointer', letterSpacing: '1px', color: C.ink, margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          INDREV
        </h1>

        {/* Right: Wishlist + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => nav('wishlist')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: C.ink, position: 'relative' }}
          >
            {ICONS.heart(23)}
            {wishlistCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: C.red, color: '#fff', fontSize: '0.6rem', fontWeight: 800, minWidth: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid #fff` }}>
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: C.ink, position: 'relative' }}
          >
            {ICONS.cart(23)}
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: C.yellow, color: C.ink, fontSize: '0.6rem', fontWeight: 800, minWidth: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${C.border}` }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── VIOLET DRAWER MENU (full-screen overlay) ── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: '#5C00E6', color: '#FFF',
            zIndex: 2000, display: 'flex', flexDirection: 'column',
            padding: '1.25rem 1.5rem', overflowY: 'auto'
          }}
        >
          {/* Top row: Socials + Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#FFF' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" style={{ color: '#FFF' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#FFF' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>

            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: '#FFF', border: `3px solid ${C.border}`, padding: '0.35rem', cursor: 'pointer', display: 'flex', boxShadow: `3px 3px 0 rgba(0,0,0,0.4)`, color: C.ink }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = 'none'; }}
              onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.4)'; }}
            >
              {ICONS.close(22)}
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1.5px solid rgba(255,255,255,0.18)', marginBottom: '1.25rem' }} />

          {/* Quick-link pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {[
              { label: '⚡ NEW ARRIVALS', bg: C.yellow, color: C.ink },
              { label: '🏆 BEST SELLERS', bg: C.green, color: '#fff' },
              { label: '🔥 CLEARANCE', bg: C.red, color: '#fff' },
            ].map(({ label, bg, color }) => (
              <button
                key={label}
                onClick={() => { nav('browse'); setMenuOpen(false); }}
                style={{
                  background: bg, color, border: `2.5px solid ${C.border}`,
                  borderRadius: '20px', padding: '0.45rem 1rem', fontWeight: 800,
                  fontSize: '0.72rem', boxShadow: `2px 2px 0 ${C.border}`,
                  whiteSpace: 'nowrap', cursor: 'pointer'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category accordion links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, marginBottom: '1.5rem' }}>

            {/* Direct link */}
            <button
              onClick={() => { nav('browse'); setMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: '#FFF', textAlign: 'left', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
            >
              Cosplay
            </button>

            <AccordionItem id="clothing" label="Clothing [Unisex]">
              {['Streetwear', 'Outerwear', 'Sportswear', 'Tees', 'Hoodies'].map(s => <DrawerLink key={s} label={s} />)}
            </AccordionItem>

            <AccordionItem id="jewellery" label="Jewellery">
              {['Rings', 'Necklaces', 'Bracelets', 'Earrings'].map(s => <DrawerLink key={s} label={s} />)}
            </AccordionItem>

            <AccordionItem id="accessories" label="Accessories">
              {['Bags', 'Belts', 'Hats & Caps', 'Sunglasses'].map(s => <DrawerLink key={s} label={s} />)}
            </AccordionItem>

            <AccordionItem id="collectibles" label="Collectibles & Decor">
              {['Tapestries', 'Notebooks', 'Keychains', 'Figures'].map(s => <DrawerLink key={s} label={s} />)}
            </AccordionItem>

            <AccordionItem id="anime" label="Bizarre Anime Finds">
              {['Official Merch', 'Fan Art Prints', 'Cosplay Props', 'Anime Tees'].map(s => <DrawerLink key={s} label={s} />)}
            </AccordionItem>

          </div>

          <hr style={{ border: 'none', borderTop: '1.5px solid rgba(255,255,255,0.18)', marginBottom: '1.25rem' }} />

          {/* Log In / Register */}
          <button
            onClick={() => { setLoginOpen(true); setMenuOpen(false); }}
            style={{ background: 'none', border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', padding: '0.5rem 0', marginBottom: '1.5rem' }}
          >
            <span style={{ background: '#FFF', color: C.ink, display: 'flex', padding: '0.3rem', border: `2px solid ${C.border}`, borderRadius: '50%' }}>
              {ICONS.user(16)}
            </span>
            LOG IN / REGISTER
          </button>

          {/* Footer sitemap links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingBottom: '1rem' }}>
            {['Coupons & Offers', 'Photos & Reviews', 'Track Order', 'Need Help?', 'About us'].map(link => (
              <span
                key={link}
                onClick={() => { nav('how'); setMenuOpen(false); }}
                style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
