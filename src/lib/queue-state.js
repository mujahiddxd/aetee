/**
 * Shared Queue State — Edge Runtime Compatible
 *
 * This module provides a lightweight, Edge-compatible bridge between
 * the queue engine (Node.js runtime) and middleware (Edge runtime).
 *
 * Both runtimes share the same globalThis in `next start` (single process),
 * so we use it as a communication channel. This avoids the middleware
 * needing to make HTTP fetches to its own server.
 *
 * The queue engine (queue.js) syncs its state here.
 * The middleware reads from here directly.
 */

const ENABLED_KEY = '__aetee_queue_enabled__';
const TOKENS_KEY = '__aetee_queue_tokens__';

// Initialize if not already set
if (globalThis[ENABLED_KEY] === undefined) {
  globalThis[ENABLED_KEY] = false;
}
if (!globalThis[TOKENS_KEY]) {
  globalThis[TOKENS_KEY] = new Set();
}

/**
 * Check if queue mode is enabled.
 * @returns {boolean}
 */
export function isQueueEnabled() {
  return globalThis[ENABLED_KEY] === true;
}

/**
 * Set the queue enabled state.
 * Called by the queue engine when enabling/disabling.
 * @param {boolean} enabled
 */
export function setQueueEnabled(enabled) {
  globalThis[ENABLED_KEY] = enabled;
}

/**
 * Check if a token is valid (exists in the active set).
 * @param {string} token
 * @returns {boolean}
 */
export function isTokenValid(token) {
  if (!token) return false;
  return globalThis[TOKENS_KEY].has(token);
}

/**
 * Add a token to the active set.
 * Called by the queue engine when admitting a user.
 * @param {string} token
 */
export function addToken(token) {
  globalThis[TOKENS_KEY].add(token);
}

/**
 * Remove a token from the active set.
 * Called by the queue engine when a token expires.
 * @param {string} token
 */
export function removeToken(token) {
  globalThis[TOKENS_KEY].delete(token);
}

/**
 * Clear all tokens.
 * Called when the queue is disabled.
 */
export function clearTokens() {
  globalThis[TOKENS_KEY].clear();
}
