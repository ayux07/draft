import React from 'react';
import { C, BTNG, INP } from '../data/theme';
import ProductCard from '../components/ProductCard';

export const SearchResults = ({ query, setQuery, dbProducts, nav, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  const res = dbProducts.filter(p => !p.hidden && (p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="tp" style={{ marginBottom: '1.5rem' }}>SEARCH RESULTS</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search again..." style={{...INP, maxWidth: '400px'}} />
        </div>
      </div>

      <div className="label-sm" style={{ marginBottom: '1.5rem', color: C.muted }}>FOUND {res.length} MATCHES FOR "{query}"</div>
      
      {res.length > 0 ? (
        <div className="g-prod">
          {res.map(p => <ProductCard key={`search-${p.id}`} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      ) : (
        <div className="neo-card" style={{ padding: '4rem 2rem', textAlign: 'center', background: C.surface }}>
          <h3 className="tc">NO MATCHES FOUND</h3>
          <p className="tb" style={{ color: C.muted, marginTop: '1rem' }}>Try different keywords or browse categories.</p>
          <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>BROWSE ALL</button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
