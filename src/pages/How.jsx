import React from 'react';
import { C, BTNP } from '../data/theme';

export const How = ({ nav }) => (
  <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1, maxWidth: '800px' }}>
    <h1 className="tp" style={{ marginBottom: '1rem', textAlign: 'center' }}>HOW INDREV WORKS</h1>
    <p className="tb" style={{ textAlign: 'center', marginBottom: '3rem', color: C.muted }}>A buyer-only platform for authenticated luxury and rare streetwear.</p>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[
        { step: '01', title: 'CURATED SELLERS ONLY', desc: 'There is no open application to sell on INDREV. We hand-pick and invite only the most reputable archive collectors, boutiques, and curators. This is a buyer-focused platform.' },
        { step: '02', title: 'MULTI-POINT AUTHENTICATION', desc: 'Every single piece is shipped to an INDREV authentication center before it reaches you. Our experts verify tags, materials, stitching, and provenance. If it is fake, you get an immediate refund.' },
        { step: '03', title: 'SECURE ESCROW', desc: 'Your payment is held in a secure escrow account. The curator does not get paid until the item is authenticated and delivered to your doorstep in the promised condition.' }
      ].map((s, i) => (
        <div key={i} className="neo-card" style={{ background: C.surface, display: 'flex', border: `4px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}`, overflow: 'hidden' }}>
          <div style={{ background: C.yellow, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `4px solid ${C.border}` }}>
            <span style={{ fontFamily: 'Bangers', fontSize: '4rem', color: C.ink }}>{s.step}</span>
          </div>
          <div style={{ padding: '2rem', flex: 1 }}>
            <h2 className="tc" style={{ marginBottom: '1rem' }}>{s.title}</h2>
            <p className="tb">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
    
    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
      <button className="neo-btn" style={{...BTNP, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('browse')}>START SHOPPING</button>
    </div>
  </div>
);

export default How;
