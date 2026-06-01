import React from 'react';
import { C } from '../data/theme';

/**
 * Global Footer - Redesigned with premium violet neobrutalism theme
 */
export const Footer = ({ nav }) => (
  <footer style={{ background: '#5C00E6', borderTop: `5px solid ${C.border}`, color: '#FFF', paddingBottom: '2rem' }}>
    <div className="ctr sec" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Upper footer grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
        
        {/* Brand & Social Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 className="th" style={{ color: '#FFF', fontSize: '2.5rem', margin: 0 }}>INDREV</h2>
          <p className="tb" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
            Comic Neobrutalism.<br/>
            All Genders. All Ages.<br/>
            Pre-authenticated premium curation.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#FFF', display: 'flex' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" style={{ color: '#FFF', display: 'flex' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8z"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M6 8c2 1 6 1 8 0"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#FFF', display: 'flex' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Sitemap: Shop */}
        <div>
          <h4 className="tc" style={{ color: C.yellow, marginBottom: '1.25rem', fontSize: '1.2rem' }}>SHOP CATEGORIES</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Streetwear', 'Outerwear', 'Footwear', 'Accessories', 'Sportswear'].map(c => (
              <span key={c} style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('browse')}>{c}</span>
            ))}
          </div>
        </div>

        {/* Sitemap: Platform */}
        <div>
          <h4 className="tc" style={{ color: C.yellow, marginBottom: '1.25rem', fontSize: '1.2rem' }}>PLATFORM & SERVICE</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('how')}>How It Works</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('how')}>Authentication</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('how')}>Curator Guide</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('how')}>100% Authenticity</span>
          </div>
        </div>

        {/* Sitemap: Info & Help */}
        <div>
          <h4 className="tc" style={{ color: C.yellow, marginBottom: '1.25rem', fontSize: '1.2rem' }}>SUPPORT & CONNECT</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Coupons & Offers', 'Photos & Reviews', 'Track Order', 'Need Help?', 'About us'].map(l => (
              <span key={l} style={{ cursor: 'pointer', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }} onClick={() => nav('how')}>{l}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Trust Blocks & Partner Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '2rem', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '2rem' }}>
        {/* Secure payments partners */}
        <div>
          <h5 className="label-sm" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>100% Secure Payments</h5>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Paytm', 'GPay', 'PhonePe', 'Visa', 'Mastercard', 'AMEX'].map(p => (
              <span key={p} className="bangers" style={{ background: '#FFF', color: C.ink, border: `2px solid ${C.border}`, padding: '0.15rem 0.4rem', fontSize: '0.8rem', borderRadius: '2px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Shipping partners */}
        <div>
          <h5 className="label-sm" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Our Shipping Partners</h5>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Delhivery', 'BlueDart', 'Express'].map(p => (
              <span key={p} className="bangers" style={{ background: '#FFF', color: C.ink, border: `2px solid ${C.border}`, padding: '0.15rem 0.4rem', fontSize: '0.8rem', borderRadius: '2px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
        <span>© {new Date().getFullYear()} INDREV. All rights reserved.</span>
        <span>Curator E-Commerce Marketplace (Buyer Only Platform)</span>
      </div>

    </div>
  </footer>
);

export default Footer;
