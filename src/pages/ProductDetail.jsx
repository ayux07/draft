import React, { useState } from 'react';
import { C, BTNP, BTNG } from '../data/theme';
import { REVIEWS, SIZES } from '../data/mockData';
import Price from '../components/common/Price';
import VerBadge from '../components/common/VerBadge';
import ModalWrapper from '../components/common/ModalWrapper';

export const ProductDetail = ({ p, nav, addCart, checkout, setAuthModalOpen }) => {
  const [authModal, setAuthModal] = useState(false);
  const [szModal, setSzModal] = useState(false);

  if (!p) return (
    <div className="ctr sec">
      <div className="neo-card" style={{padding:'3rem', textAlign:'center'}}>
        <h2 className="th">NO PRODUCT SELECTED</h2>
        <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>BACK TO SHOP</button>
      </div>
    </div>
  );

  return (
    <div key="product" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <div className="ctr sec">
        <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('browse')}>← BACK TO SHOP</button>
        
        <div className="g-detail">
          {/* Image well */}
          <div style={{ border: `3px solid ${C.border}`, background: p.color, width: '100%', aspectRatio: '4/5', position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '6vw', transform: 'rotate(-45deg)' }}>{p.brand}</span>
            </div>
            {p.tag && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
                <span style={{ background: C.yellow, color: C.ink, border: `2px solid ${C.border}`, padding: '0.4rem 0.8rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', boxShadow: `2px 2px 0 ${C.shadow}` }}>
                  {p.tag}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="label-sm" style={{ color: C.muted, display: 'block', marginBottom: '0.5rem' }}>{p.gender} • {p.cat}</span>
              <h1 className="tp" style={{ marginBottom: '0.75rem' }}>{p.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="label-sm" style={{ color: C.ink }}>{p.brand}</span>
                <VerBadge />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Price n={p.price} style={{ fontSize: '2.5rem' }} />
                <div style={{ textAlign: 'right' }}>
                   <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, padding: '0.3rem 0.6rem', display: 'inline-block' }}>{p.cond} CONDITION</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `4px solid ${C.border}`, borderBottom: `4px solid ${C.border}`, padding: '1.5rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div className="label-sm" style={{ color: C.muted, marginBottom: '0.25rem' }}>BRAND</div>
                <div className="tb" style={{ fontWeight: 600 }}>{p.brand}</div>
              </div>
              <div>
                <div className="label-sm" style={{ color: C.muted, marginBottom: '0.25rem' }}>SIZE</div>
                <div className="tb" style={{ fontWeight: 600 }}>{p.size}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="neo-btn" style={{...BTNP, width: '100%', fontSize: '1.25rem', padding: '1rem'}} onClick={() => checkout(p)}>BUY NOW</button>
              <button className="neo-btn" style={{...BTNG, width: '100%', fontSize: '1.25rem', padding: '1rem'}} onClick={() => addCart(p)}>ADD TO CART</button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button className="neo-btn" style={{...BTNG, width: '100%'}} onClick={() => setAuthModal(true)}>AUTHENTICITY ✓</button>
                <button className="neo-btn" style={{...BTNG, width: '100%'}} onClick={() => setSzModal(true)}>SIZE GUIDE 📏</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: `4px solid ${C.border}` }}>
          <h2 className="ts" style={{ marginBottom: '2rem' }}>REVIEWS ({REVIEWS.length})</h2>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {REVIEWS.map(r => (
              <div key={r.id} className="neo-card" style={{ background: C.surface, padding: '1.5rem', display: 'flex', flexDirection: 'column', border: `3px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="tb" style={{ fontWeight: 700 }}>{r.user}</span>
                  <span style={{ color: C.yellowDk, fontFamily: 'Bangers', fontSize: '1.2rem', textShadow: `1px 1px 0 ${C.shadow}` }}>
                    {'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}
                  </span>
                </div>
                <span className="label-sm" style={{ color: C.muted, marginBottom: '1rem' }}>{r.date}</span>
                <p className="tb" style={{ fontSize: '0.95rem', flex: 1 }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {authModal && (
        <ModalWrapper close={() => setAuthModal(false)} title="AUTHENTICITY GUARANTEE">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', border: `4px solid ${C.ink}`, color: C.ink, fontFamily: 'Bangers', fontSize: '2.5rem', padding: '1rem 2rem', transform: 'rotate(-5deg)', boxShadow: `4px 4px 0 ${C.yellow}` }}>
              VERIFIED BY INDREV
            </div>
            <p className="tb" style={{ marginTop: '1.5rem', fontWeight: 600 }}>Every piece is hand-checked by our experts before it reaches your door.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { t: 'Verified Sellers', d: 'Only curated, vetted sellers are allowed on our platform.' },
              { t: 'Authenticated Pieces', d: 'Zero fakes. Strict multi-point inspection for authenticity.' },
              { t: 'Protected Payments', d: 'Money is held securely until you receive and verify the item.' }
            ].map((p, i) => (
              <div key={i} style={{ border: `3px solid ${C.border}`, padding: '1rem', background: C.bg }}>
                <h4 className="tc" style={{ color: C.blue, marginBottom: '0.25rem' }}>✔️ {p.t}</h4>
                <p className="tb" style={{ fontSize: '0.9rem' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}

      {szModal && (
        <ModalWrapper close={() => setSzModal(false)} title="SIZE GUIDE">
          <p className="tb" style={{ marginBottom: '1.5rem' }}>
            Size configurations for <span style={{ fontWeight: 700 }}>{p.gender} {p.cat}</span>.
          </p>
          <div style={{ border: `3px solid ${C.border}`, background: C.surface }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `3px solid ${C.border}`, background: C.yellow }}>
              <div style={{ padding: '0.75rem 1rem', fontWeight: 700, borderRight: `3px solid ${C.border}` }}>Category</div>
              <div style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Available Ranges</div>
            </div>
            {Object.entries(SIZES[p.gender] || {}).map(([cat, range], i, arr) => (
              <div key={cat} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? `3px solid ${C.border}` : 'none' }}>
                <div style={{ padding: '0.75rem 1rem', borderRight: `3px solid ${C.border}`, fontWeight: cat === p.cat ? 700 : 400 }}>{cat}</div>
                <div style={{ padding: '0.75rem 1rem', fontWeight: cat === p.cat ? 700 : 400 }}>{range}</div>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default ProductDetail;
