import React from 'react';
import { C, BTNG } from '../data/theme';
import ProductCard from '../components/ProductCard';

export const Wishlist = ({ nav, dbProducts, wishlist, toggleWishlist, setSelProduct, addCart }) => {
  const items = dbProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <h1 className="tp" style={{ marginBottom: '2rem' }}>YOUR SAVED PIECES</h1>
      {items.length > 0 ? (
        <div className="g-prod">
          {items.map(p => <ProductCard key={`wish-${p.id}`} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      ) : (
        <div className="neo-card" style={{ padding: '4rem 2rem', textAlign: 'center', background: C.surface }}>
          <h3 className="tc" style={{ marginBottom: '1rem' }}>YOUR WISHLIST IS EMPTY</h3>
          <p className="tb" style={{ color: C.muted }}>Save items you love to keep track of them here.</p>
          <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>START SHOPPING</button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
