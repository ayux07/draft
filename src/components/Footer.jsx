import React from 'react';
import { C } from '../data/theme';

/**
 * Global Footer
 */
export const Footer = ({ nav }) => (
  <footer style={{ background: C.surface, borderTop: `4px solid ${C.yellow}` }}>
    <div className="ctr sec">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <h2 className="ts">INDREV</h2>
          <p className="tb" style={{ color: C.muted, marginTop: '1rem' }}>Comic Neobrutalism.<br/>All Genders. All Ages.</p>
        </div>
        <div>
          <h4 className="tc" style={{ marginBottom: '1rem' }}>SHOP</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('browse')}>All Pieces</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('browse')}>Curators</span>
          </div>
        </div>
        <div>
          <h4 className="tc" style={{ marginBottom: '1rem' }}>PLATFORM</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('how')}>How It Works</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('how')}>Authentication</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `3px solid ${C.border}`, paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span className="tsm" style={{ color: C.muted }}>© {new Date().getFullYear()} INDREV. All rights reserved.</span>
        <span className="tsm" style={{ color: C.muted }}>BUYER ONLY PLATFORM</span>
      </div>
    </div>
  </footer>
);

export default Footer;
