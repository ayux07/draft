import React from 'react';
import { fmt } from '../../utils/formatters';
import { C } from '../../data/theme';

/**
 * Large price display with currency prefix
 */
export const Price = ({ n, style = {} }) => (
  <span style={{ 
    display: 'inline-flex', 
    alignItems: 'baseline', 
    gap: '0.25rem', 
    color: C.ink, 
    fontFamily: 'Bangers, cursive', 
    ...style 
  }}>
    <span style={{ fontSize: '0.7em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Rs.</span>
    <span>{fmt(n)}</span>
  </span>
);

export default Price;
