/* ============================================================
   INDREV Utilities — Formatters
   ============================================================ */

/**
 * Formats a number as a currency string (Indian Rupees)
 * @param {number} n 
 * @returns {string}
 */
export const fmt = (n) => {
  if (n === undefined || n === null) return '0';
  return n.toLocaleString('en-IN');
};

/**
 * Formats a number to a shortened "k" format for large numbers
 * @param {number} n 
 * @returns {string}
 */
export const fmtNum = (n) => {
  if (n === undefined || n === null) return '0';
  return n >= 1000 ? (n/1000).toFixed(1) + 'k' : n.toString();
};

/**
 * Simple UUID generator for mock IDs
 * @returns {string}
 */
export const uuid = () => Math.random().toString(36).substring(2, 11);
