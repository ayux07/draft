import React from 'react';
import { C, BTNG, BTNP } from '../data/theme';
import { Price } from './common/Price';

/**
 * Slide-out Shopping Bag panel
 */
export const CartDrawer = ({ close, cart, checkoutCart, setCart }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,13,13,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }} onClick={close}>
      <div 
        className="cart-drawer-panel"
        style={{ 
          width: '100%', maxWidth: '400px', background: C.bg, height: '100dvh', 
          borderLeft: `4px solid ${C.border}`, display: 'flex', flexDirection: 'column', 
          boxShadow: `-8px 0 0 ${C.shadow}`, animation: 'slideInRight 0.3s ease' 
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ background: C.yellow, borderBottom: `4px solid ${C.border}`, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="ts" style={{ margin: 0 }}>YOUR BAG ({cart.reduce((a,c)=>a+c.qty,0)})</h2>
          <button onClick={close} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: C.ink, lineHeight: 1 }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: C.muted, marginTop: '2rem' }}>
              <p className="tb">Your bag is completely empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={`${item.id}-${i}`} style={{ display: 'flex', gap: '1rem', border: `3px solid ${C.border}`, background: C.surface, padding: '1rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
                <div style={{ width: '80px', height: '80px', background: item.color, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.3)', fontSize: '2rem' }}>{item.brand.charAt(0)}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="label-sm">{item.brand}</span>
                    <button style={{ background: 'none', border: 'none', color: C.red, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                  </div>
                  <h4 className="tb" style={{ fontSize: '1rem', fontWeight: 600, margin: '0.25rem 0' }}>{item.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button className="neo-btn" style={{...BTNG, padding: '0.25rem 0.6rem'}} onClick={() => setCart(prev => prev.map((p, idx) => idx === i ? { ...p, qty: p.qty - 1 } : p).filter(p => p.qty > 0))}>−</button>
                      <span className="label-sm" style={{ color: C.muted }}>{item.qty}</span>
                      <button className="neo-btn" style={{...BTNG, padding: '0.25rem 0.6rem'}} onClick={() => setCart(prev => prev.map((p, idx) => idx === i ? { ...p, qty: p.qty + 1 } : p))}>+</button>
                    </div>
                    <Price n={item.price} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div style={{ borderTop: `4px solid ${C.border}`, padding: '1.5rem', background: C.surface }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
              <span className="tb" style={{ fontWeight: 700 }}>SUBTOTAL</span>
              <Price n={total} style={{ fontSize: '1.5rem' }} />
            </div>
            <button className="neo-btn" style={{...BTNP, width: '100%', fontSize: '1.2rem', padding: '1rem'}} onClick={checkoutCart}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
