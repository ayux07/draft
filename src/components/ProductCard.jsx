import React, { useState } from 'react';
import { C, TAG_COLORS } from '../data/theme';
import { Price } from './common/Price';

/**
 * Main Product Card component used in grids
 */
export const ProductCard = ({ p, nav, setSelProduct, addCart, wishlist = [], toggleWishlist }) => {
  const [hov, setHov] = useState(false);
  
  return (
    <div 
      className="neo-card" 
      style={{ display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', border: `3px solid ${C.border}` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => { if(setSelProduct) setSelProduct(p); nav('product'); }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: p.color, borderBottom: `3px solid ${C.border}`, overflow: 'hidden' }}>
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
        
        {/* Placeholder label simulating real product image */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '4rem', transform: 'rotate(-45deg)' }}>{p.brand}</span>
        </div>

        {toggleWishlist && (
          <button
            className="neo-btn"
            style={{ 
              position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10, 
              background: C.surface, border: `3px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, 
              borderRadius: 0, padding: '0.25rem 0.5rem', fontSize: '1.1rem', cursor: 'pointer', 
              color: wishlist.includes(p.id) ? C.red : C.ink 
            }}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          >
            {wishlist.includes(p.id) ? '♥' : '♡'}
          </button>
        )}
        
        {p.tag && (
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10 }}>
            <span style={{ 
              background: TAG_COLORS[p.tag] || C.yellow, color: C.ink, border: `2px solid ${C.border}`, 
              padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, 
              textTransform: 'uppercase', boxShadow: `2px 2px 0 ${C.shadow}` 
            }}>
              {p.tag}
            </span>
          </div>
        )}
        
        <div 
          className="atc-btn"
          style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', zIndex: 10, opacity: hov ? 1 : 0, transition: 'opacity 0.2s ease' }}
          onClick={(e) => { e.stopPropagation(); addCart(p); }}
        >
          <div className="neo-btn" style={{ background: C.yellow, border: `3px solid ${C.border}`, padding: '0.25rem 0.75rem', boxShadow: `4px 4px 0 ${C.shadow}`, color: C.ink, fontWeight: 700, fontSize: '0.85rem' }}>
            + CART
          </div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="label-sm" style={{ color: C.muted }}>{p.brand}</span>
          <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.1rem 0.3rem' }}>{p.size} • {p.cond}</span>
        </div>
        <h3 className="tc" style={{ fontSize: '1.25rem', flex: 1 }}>{p.name}</h3>
        <div style={{ marginTop: '0.5rem' }}>
          <Price n={p.price} style={{ fontSize: '1.5rem' }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
