import React from 'react';
import { C, BTNP, BTNG } from '../data/theme';
import ProductCard from '../components/ProductCard';

export const Home = ({ nav, dbProducts, featured, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  const featProducts = (() => {
    const pinned = dbProducts.filter(p => featured.includes(p.id));
    if (pinned.length > 0) return pinned;
    const tagged = dbProducts.filter(p => p.tag === 'Featured');
    if (tagged.length > 0) return tagged.slice(0, 4);
    return dbProducts.slice(0, 8);
  })();

  return (
    <div key="home" style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Hero Section */}
      <section style={{ borderBottom: `4px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=1200&q=80" 
          srcSet="https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=600&q=80 600w,
                  https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=1200&q=80 1200w,
                  https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=2000&q=80 2000w"
          sizes="100vw"
          alt="Curated Fashion"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.15 }}
        />
        <div className="halftone" style={{ position: 'absolute', inset: 0, zIndex: 0 }}></div>
        <div className="stripe-bg" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '120%', zIndex: 0, transform: 'rotate(15deg)' }}></div>
        
        <div className="ctr sec" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ background: C.yellow, display: 'inline-block', padding: '0.5rem 1rem', border: `3px solid ${C.border}`, marginBottom: '1.5rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
              <span className="label-sm" style={{ color: C.ink }}>THE NEW STANDARD IN LUXURY</span>
            </div>
            <h1 className="th" style={{ marginBottom: '2rem', textShadow: `4px 4px 0 ${C.surface}, -1px -1px 0 ${C.surface}, 1px -1px 0 ${C.surface}, -1px 1px 0 ${C.surface}, 1px 1px 0 ${C.surface}` }}>
              CURATED FASHION <br/>FOR EVERYONE.
            </h1>
            <p className="tb" style={{ marginBottom: '2.5rem', maxWidth: '600px', fontSize: '1.2rem', background: C.surface, padding: '1rem', border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}` }}>
              Shop authenticated luxury pieces from top verified curators. 
              Menswear, womenswear, and rare archival streetwear.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="neo-btn" style={{...BTNP, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('browse')}>SHOP COLLECTION</button>
              <button className="neo-btn" style={{...BTNG, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('categories')}>VIEW CATEGORIES</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div style={{ background: C.yellow, borderBottom: `4px solid ${C.border}`, padding: '1.5rem 0' }}>
        <div className="ctr" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[
            { l: 'THEMATIC CATEGORIES', n: '5+' },
            { l: 'CURATED PIECES', n: '120+' },
            { l: 'AUTHENTICATED', n: '100%' }
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <span className="td" style={{ margin: 0, color: C.ink }}>{x.n}</span>
              <span className="label-sm" style={{ color: C.ink }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Section */}
      <div className="ctr sec">
        <h2 className="ts" style={{ textAlign: 'center', marginBottom: '3rem' }}>NEW ARRIVALS</h2>
        <div className="g-prod" style={{ justifyContent: 'center' }}>
          {featProducts.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
