import React from 'react';
import { C, BTNG } from '../data/theme';
import ProductCard from '../components/ProductCard';

export const CategoryDetail = ({ c, nav, dbProducts, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  if (!c) return (
    <div className="ctr sec">
      <div className="neo-card" style={{padding:'3rem', textAlign:'center'}}>
        <h2 className="th">NO CATEGORY SELECTED</h2>
        <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('categories')}>BACK TO CATEGORIES</button>
      </div>
    </div>
  );
  
  const catProducts = dbProducts.filter(p => p.cat === c.name);
  
  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('categories')}>← ALL CATEGORIES</button>
      
      <div style={{ background: c.color, border: `4px solid ${C.border}`, padding: '3rem 2rem', position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.shadow}`, marginBottom: '3rem' }}>
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}></div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', border: `4px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}` }}>
            {c.icon}
          </div>
          <div style={{ color: C.surface, flex: 1, minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <h1 className="tp" style={{ margin: 0, textShadow: `2px 2px 0 ${C.ink}` }}>{c.name}</h1>
            </div>
            <p className="tb" style={{ fontSize: '1.2rem', marginBottom: '1rem', textShadow: `1px 1px 0 ${C.ink}` }}>{c.bio}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="label-sm" style={{ background: C.surface, color: C.ink, padding: '0.3rem 0.6rem', border: `2px solid ${C.border}` }}>{catProducts.length} ITEMS</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="ts" style={{ marginBottom: '2rem' }}>COLLECTION</h2>
      {catProducts.length > 0 ? (
        <div className="g-prod">
          {catProducts.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      ) : (
        <div className="neo-card" style={{ padding: '3rem', textAlign: 'center', background: C.surface }}>
          <h3 className="tc">NO ITEMS AVAILABLE</h3>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
