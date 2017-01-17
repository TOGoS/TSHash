/*
 * This structure (keeping tshash files under tshash/,
 * with a tshash/index.ts but also a tshash.ts here)
 * Makes both NPM packages work (when everything under tshash/ is copied to the root to make the package),
 * and the generated AMD work (because TypeScript compiler will include 'tshash/' in the module names).
 *
 * Is there an easier way???
 */

export * from './tshash/index';
