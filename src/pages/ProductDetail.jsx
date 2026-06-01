import React, { useState, useEffect } from 'react';
import { C, BTNP, BTNG } from '../data/theme';
import { REVIEWS, SIZES } from '../data/mockData';
import Price from '../components/common/Price';
import VerBadge from '../components/common/VerBadge';
import ModalWrapper from '../components/common/ModalWrapper';

// Deterministic mock pricing helper
const getPricingData = (price, id) => {
  const discountPercent = 30 + (id % 5) * 5; // 30%, 35%, 40%, 45%, 50%
  const originalPrice = Math.round(price / (1 - discountPercent / 100));
  return { originalPrice, discountPercent };
};

export const ProductDetail = ({ p, nav, addCart, checkout, isQuickView = false }) => {
  const [authModal, setAuthModal] = useState(false);
  const [szModal, setSzModal] = useState(false);
  
  // New States for Redesign
  const [qty, setQty] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState('specs');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Scroll listener for sticky bottom bar (mobile)
  useEffect(() => {
    if (isQuickView) return;
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isQuickView]);

  if (!p) return (
    <div className="ctr sec">
      <div className="neo-card" style={{padding:'3rem', textAlign:'center'}}>
        <h2 className="th">NO PRODUCT SELECTED</h2>
        <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>BACK TO SHOP</button>
      </div>
    </div>
  );

  const { originalPrice, discountPercent } = getPricingData(p.price, p.id);
  const handleQtyChange = (delta) => setQty(prev => Math.max(1, prev + delta));

  return (
    <div key="product" style={{ animation: 'fadeIn 0.3s ease', flex: 1, paddingBottom: isQuickView ? 0 : '80px' }}>
      <div className="ctr sec">
        {!isQuickView && (
          <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('browse')}>← BACK TO SHOP</button>
        )}
        
        <div className="g-detail">
          {/* Main Visuals & Image Carousel Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ border: `3px solid ${C.border}`, background: p.color, width: '100%', aspectRatio: '1/1', position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.shadow}` }}>
              {p.img ? (
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '6vw', transform: 'rotate(-45deg)' }}>{p.brand}</span>
                </div>
              )}
              <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}></div>
              
              {p.tag && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
                  <div style={{ 
                    background: C.yellow, color: C.ink, border: `2px solid ${C.border}`,
                    fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', boxShadow: `2.5px 2.5px 0 ${C.shadow}`,
                    padding: '0.4rem 0.8rem'
                  }}>
                    {p.tag}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Indicators (Image Carousel Mock) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  style={{
                    width: idx === activeImgIndex ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: idx === activeImgIndex ? C.yellow : C.mutedLo,
                    border: `2px solid ${C.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Description, Actions, Accordions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header info */}
            <div>
              <span className="label-sm" style={{ color: C.muted, display: 'block', marginBottom: '0.25rem' }}>{p.gender} • {p.cat}</span>
              <h1 className="tp" style={{ marginBottom: '0.5rem', fontSize: '2.5rem', lineHeight: 1 }}>{p.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="label-sm" style={{ color: C.ink, fontSize: '0.85rem' }}>{p.brand}</span>
                <VerBadge />
              </div>

              {/* Pricing Blocks (Sale, Strikethrough, Discount Badge) */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <Price n={p.price} style={{ fontSize: '3rem' }} />
                    <span style={{ fontSize: '1.25rem', textDecoration: 'line-through', color: C.mutedLo, fontWeight: 700 }}>
                      Rs. {originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="bangers" style={{ background: C.green, color: '#FFF', border: `2px solid ${C.border}`, padding: '0.2rem 0.6rem', fontSize: '1.1rem', boxShadow: `2px 2px 0 ${C.shadow}`, display: 'inline-block', marginTop: '0.25rem' }}>
                    {discountPercent}% OFF
                  </span>
                </div>
                
                <span className="label-sm" style={{ background: C.bg, border: `2.5px solid ${C.border}`, boxShadow: `2.5px 2.5px 0 ${C.shadow}`, padding: '0.4rem 0.8rem', fontWeight: 800 }}>
                  {p.cond} CONDITION
                </span>
              </div>
            </div>

            {/* Social Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <div style={{ background: C.yellow, border: `2.5px solid ${C.border}`, padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: `3.5px 3.5px 0 ${C.border}` }}>
                <span style={{ fontSize: '1.2rem' }}>🔥</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: C.ink }}>78 PEOPLE BOUGHT IN LAST 24 HOURS</span>
              </div>
              <div style={{ background: '#FFF0F0', border: `2.5px solid ${C.border}`, padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: `3.5px 3.5px 0 ${C.border}` }}>
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: C.red }}>ONLY 7 LEFT IN STOCK</span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Container */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
              {/* Quantity Box */}
              <div style={{ display: 'flex', alignItems: 'center', border: `3px solid ${C.border}`, background: C.surface, height: '54px', boxShadow: `3.5px 3.5px 0 ${C.border}` }}>
                <button onClick={() => handleQtyChange(-1)} style={{ width: '48px', height: '100%', border: 'none', background: 'none', fontSize: '1.25rem', fontWeight: 800, cursor: 'pointer' }}>−</button>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 800, fontFamily: 'Inter' }}>{qty}</span>
                <button onClick={() => handleQtyChange(1)} style={{ width: '48px', height: '100%', border: 'none', background: 'none', fontSize: '1.25rem', fontWeight: 800, cursor: 'pointer' }}>+</button>
              </div>

              {/* Action Button */}
              <button 
                className="neo-btn" 
                style={{ 
                  ...BTNP, 
                  flex: 1, 
                  height: '54px', 
                  fontSize: '1.2rem', 
                  fontWeight: 800, 
                  boxShadow: `3.5px 3.5px 0 ${C.border}` 
                }} 
                onClick={() => addCart({ ...p, qty })}
              >
                ADD TO CART
              </button>
            </div>

            {/* Buy Now & Wishlist Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
              <button className="neo-btn" style={{...BTNG, height: '50px', background: C.ink, color: '#FFF', fontWeight: 800, boxShadow: `3.5px 3.5px 0 ${C.border}`}} onClick={() => checkout(p)}>
                BUY IT NOW
              </button>
              <button className="neo-btn" style={{...BTNG, width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `3.5px 3.5px 0 ${C.border}`}} onClick={() => setSzModal(true)}>
                📏
              </button>
            </div>

            {/* Product Details Collapsible Accordions */}
            <div style={{ border: `3px solid ${C.border}`, background: C.surface, marginTop: '1rem', boxShadow: `4px 4px 0 ${C.border}` }}>
              {[
                { id: 'specs', t: 'SPECIFICATIONS', c: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div className="label-sm" style={{ color: C.muted, fontSize: '0.65rem' }}>BRAND</div>
                      <div className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.brand}</div>
                    </div>
                    <div>
                      <div className="label-sm" style={{ color: C.muted, fontSize: '0.65rem' }}>SIZE</div>
                      <div className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.size}</div>
                    </div>
                    <div>
                      <div className="label-sm" style={{ color: C.muted, fontSize: '0.65rem' }}>CONDITION</div>
                      <div className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.cond}</div>
                    </div>
                    <div>
                      <div className="label-sm" style={{ color: C.muted, fontSize: '0.65rem' }}>GENDER</div>
                      <div className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.gender}</div>
                    </div>
                  </div>
                )},
                { id: 'desc', t: 'DESCRIPTION', c: (
                  <p className="tb" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Highly curated collectible from top curator stores. 100% authenticated wool and tailoring specifications, hand-checked and curated strictly. An iconic release representing pure brand identity.
                  </p>
                )},
                { id: 'delivery', t: 'INFO & DELIVERY', c: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span>📦 <strong>Express Shipping</strong>: Delivered within 2-4 business days.</span>
                    <span>🛡️ <strong>Authentication</strong>: Inspected in-hand by our expert curators.</span>
                    <span>🔄 <strong>Return Policy</strong>: Protected under Buyer-Only authenticity guarantees.</span>
                  </div>
                )}
              ].map((section, idx, arr) => (
                <div key={section.id} style={{ borderBottom: idx < arr.length - 1 ? `3px solid ${C.border}` : 'none' }}>
                  <div 
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                    style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: activeAccordion === section.id ? C.bg : 'none' }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.05em' }}>{section.t}</span>
                    <span style={{ fontWeight: 800 }}>{activeAccordion === section.id ? '−' : '+'}</span>
                  </div>
                  {activeAccordion === section.id && (
                    <div style={{ padding: '1.25rem 1rem', background: '#FFFEF9', borderTop: `3px solid ${C.border}` }}>
                      {section.c}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dashed Trust Boxes */}
            <div className="dashed-trust-box">
              <h4 className="label-sm" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>100% SECURE PAYMENT & PARTNERS</h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', opacity: 0.85 }}>
                <span className="bangers" style={{ fontSize: '1rem', background: C.bg, padding: '0.2rem 0.5rem', border: `1.5px solid ${C.border}` }}>Paytm</span>
                <span className="bangers" style={{ fontSize: '1rem', background: C.bg, padding: '0.2rem 0.5rem', border: `1.5px solid ${C.border}` }}>GPay</span>
                <span className="bangers" style={{ fontSize: '1rem', background: C.bg, padding: '0.2rem 0.5rem', border: `1.5px solid ${C.border}` }}>PhonePe</span>
                <span className="bangers" style={{ fontSize: '1rem', background: C.bg, padding: '0.2rem 0.5rem', border: `1.5px solid ${C.border}` }}>Visa</span>
                <span className="bangers" style={{ fontSize: '1rem', background: C.bg, padding: '0.2rem 0.5rem', border: `1.5px solid ${C.border}` }}>MC</span>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: `4px solid ${C.border}` }}>
          <h2 className="ts" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>REVIEWS ({REVIEWS.length})</h2>
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

      {/* Persistent Sticky Bottom Action Bar (Triggers on Mobile Scroll) */}
      {!isQuickView && showStickyBar && (
        <div className="nav-mobile sticky-bottom-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', border: `2px solid ${C.border}`, background: p.color, overflow: 'hidden' }}>
              {p.img && <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="bangers" style={{ fontSize: '1rem', color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                {p.name}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: C.red }}>ONLY 7 LEFT</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Price n={p.price} style={{ fontSize: '1.25rem' }} />
            <button 
              onClick={() => addCart({ ...p, qty })} 
              className="neo-btn" 
              style={{ 
                background: C.yellow, border: `2px solid ${C.border}`, padding: '0.4rem 0.75rem', 
                fontSize: '0.75rem', fontWeight: 800, boxShadow: `2px 2px 0 ${C.shadow}`, cursor: 'pointer' 
              }}
            >
              + CART
            </button>
          </div>
        </div>
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
