import React, { useState } from 'react';
import { C, TAG_COLORS, ICONS } from '../data/theme';
import { Price } from './common/Price';

// Deterministic mock pricing helper
const getPricingData = (price, id) => {
  const discountPercent = 30 + (id % 5) * 5; // 30%, 35%, 40%, 45%, 50%
  const originalPrice = Math.round(price / (1 - discountPercent / 100));
  return { originalPrice, discountPercent };
};

/**
 * Main Product Card component used in grids
 */
export const ProductCard = ({ p, nav, setSelProduct, addCart, wishlist = [], toggleWishlist }) => {
  const [hov, setHov] = useState(false);
  const { originalPrice, discountPercent } = getPricingData(p.price, p.id);
  
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
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10 }}>
            <div style={{ 
              background: C.yellow, color: C.ink, border: `2px solid ${C.border}`, padding: '0.2rem 0.4rem', 
              fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', boxShadow: `1.5px 1.5px 0 ${C.shadow}`,
            }}>
              {p.tag}
            </div>
          </div>
        )}
        
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          style={{ 
            position: 'absolute', top: '0.5rem', right: '0.5rem', 
            background: wishlist.includes(p.id) ? C.red : C.surface, 
            border: `2px solid ${C.border}`, padding: '0.35rem', cursor: 'pointer', 
            boxShadow: `2px 2px 0 ${C.shadow}`, display: 'flex', zIndex: 11 
          }}
        >
          <div style={{ color: wishlist.includes(p.id) ? '#fff' : C.ink }}>
            {ICONS.heart(14)}
          </div>
        </button>
      </div>
      
      <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.2rem' }}>
          <span className="label-sm" style={{ color: C.muted, fontSize: '0.65rem' }}>{p.brand}</span>
          <span className="label-sm" style={{ background: C.bg, border: `1.5px solid ${C.border}`, padding: '0.05rem 0.25rem', fontSize: '0.6rem' }}>{p.size} • {p.cond}</span>
        </div>
        <h3 className="tc" style={{ fontSize: '0.95rem', flex: 1, fontWeight: 700, lineHeight: 1.2, margin: '0.1rem 0' }}>{p.name}</h3>
        
        {/* Pricing & Cart Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '0.25rem', marginTop: '0.25rem', borderTop: `1.5px solid rgba(13,13,13,0.08)`, paddingTop: '0.4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', flexWrap: 'wrap' }}>
              <Price n={p.price} style={{ fontSize: '1rem' }} />
              <span style={{ fontSize: '0.65rem', textDecoration: 'line-through', color: C.mutedLo, fontWeight: 600 }}>
                Rs.{originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: C.green, textTransform: 'uppercase', marginTop: '-0.15rem' }}>
              {discountPercent}% OFF
            </span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); addCart(p); }}
            className="neo-btn" 
            style={{ 
              background: C.yellow, border: `2px solid ${C.border}`, padding: '0.25rem 0.4rem', 
              fontSize: '0.65rem', fontWeight: 800, color: C.ink, boxShadow: `2px 2px 0 ${C.shadow}`,
              borderRadius: '2px', cursor: 'pointer', transform: 'translateY(-1px)'
            }}
          >
            + CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
