import React from 'react';
import { C, BTNP, BTNG } from '../data/theme';
import { fmt } from '../utils/formatters';
import Price from '../components/common/Price';

export const OrderSummary = ({ items, nav }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal > 100000 ? 0 : 299;
  const authFee = 500;
  const total = subtotal + shipping + authFee;

  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('browse')}>← BACK TO SHOP</button>
      <h1 className="tp" style={{ marginBottom: '2rem' }}>ORDER SUMMARY</h1>
      
      <div className="g-detail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="neo-card" style={{ display: 'flex', gap: '1rem', border: `3px solid ${C.border}`, background: C.surface, padding: '1rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
              <div style={{ width: '80px', height: '80px', background: item.color, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.3)', fontSize: '2rem' }}>{item.brand.charAt(0)}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="label-sm" style={{ color: C.muted }}>{item.brand}</span>
                  <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.1rem 0.3rem' }}>{item.size} • {item.cond}</span>
                </div>
                <h4 className="tb" style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0.25rem 0' }}>{item.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', alignItems: 'flex-end' }}>
                  <span className="label-sm" style={{ color: C.ink }}>QTY: {item.qty}</span>
                  <Price n={item.price} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
          <div className="neo-card" style={{ background: C.surface, border: `4px solid ${C.border}`, padding: '2rem', boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem', borderBottom: `3px solid ${C.border}`, paddingBottom: '1rem' }}>TOTAL</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>SUBTOTAL</span>
                <span className="tb" style={{ fontWeight: 600 }}>Rs. {fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>SHIPPING</span>
                <span className="tb" style={{ fontWeight: 600 }}>{shipping === 0 ? 'FREE' : `Rs. ${fmt(shipping)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>AUTH FEE</span>
                <span className="tb" style={{ fontWeight: 600 }}>Rs. {fmt(authFee)}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `4px solid ${C.border}`, paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <span className="ts" style={{ margin: 0 }}>TOTAL</span>
              <Price n={total} style={{ fontSize: '2rem' }} />
            </div>
            
            <button className="neo-btn" style={{ ...BTNP, width: '100%', fontSize: '1rem', padding: '1.5rem 1rem', opacity: 0.6, cursor: 'not-allowed' }} disabled>
              PLACE ORDER (RAZORPAY COMING SOON)
            </button>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
              {['Authenticated', 'Escrow Protected', 'Easy Returns'].map(badge => (
                <span key={badge} className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.3rem 0.6rem', color: C.ink }}>
                  ✓ {badge.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
