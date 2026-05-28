import React, { useState } from 'react';
import { C, TAG_COLORS, ICONS } from '../data/theme';
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
      <div style={{ borderBottom: `3px solid ${C.border}`, background: p.color, width: '100%', aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>
        {p.img ? (
          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '3rem' }}>{p.brand.charAt(0)}</span>
          </div>
        )}
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}></div>
        
        {p.tag && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10 }}>
            <div style={{ 
              background: C.yellow, color: C.ink, border: `2px solid ${C.border}`, padding: '0.25rem 0.5rem', 
              fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', boxShadow: `2px 2px 0 ${C.shadow}`,
              clipPath: p.tag === 'Featured' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
            }}>
              {p.tag}
            </div>
          </div>
        )}
        
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: wishlist.includes(p.id) ? C.red : C.surface, border: `2px solid ${C.border}`, padding: '0.4rem', cursor: 'pointer', boxShadow: `2px 2px 0 ${C.shadow}`, display: 'flex', zIndex: 11 }}
        >
          <div style={{ color: wishlist.includes(p.id) ? '#fff' : C.ink }}>
            {ICONS.heart(18)}
          </div>
        </button>

        <button 
          className="neo-btn quick-view-btn"
          onClick={(e) => { e.stopPropagation(); if(setQuickViewProduct) setQuickViewProduct(p); }}
          style={{ 
            position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 11, 
            background: '#fff', border: `2px solid ${C.border}`, padding: '0.4rem', 
            boxShadow: `2px 2px 0 ${C.shadow}`,
            alignItems: 'center', gap: '0.4rem'
          }}
        >
          {ICONS.eye(16)}
          <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>QUICK LOOK</span>
        </button>
        
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
