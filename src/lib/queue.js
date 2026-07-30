/**
 * Virtual Queue Engine — In-Memory Singleton
 *
 * Manages a virtual waiting room for high-traffic events.
 * Tracks active (admitted) sessions and a FIFO waiting queue.
 * Runs entirely in-process — no Redis needed for single-VPS deployments.
 */

import crypto from 'crypto';
import {
  setQueueEnabled,
  addToken,
  removeToken,
  clearTokens,
} from '@/lib/queue-state';

class QueueEngine {
  constructor() {
    /** Whether queue mode is active */
    this.enabled = false;

    /**
     * Map of admitted tokens → { sessionId, expiresAt, lastSeen }
     * @type {Map<string, { sessionId: string, expiresAt: number, lastSeen: number }>}
     */
    this.activeTokens = new Map();

    /**
     * Ordered waiting list — FIFO
     * Each entry: { sessionId, joinedAt }
     * @type {Array<{ sessionId: string, joinedAt: number }>}
     */
    this.waitingQueue = [];

    /**
     * Map sessionId → token (for admitted users) or null (for waiting users)
     * Used for quick lookups.
     * @type {Map<string, string|null>}
     */
    this.sessionIndex = new Map();

    /** Max simultaneous active users */
    this.maxConcurrent = 100;

    /** How long an admitted user's pass lasts (ms). Default: 10 minutes */
    this.tokenTTL = 10 * 60 * 1000;

    /** Average time per slot admission for ETA calculation (ms) */
    this.avgAdmitInterval = 3000;

    // Start background cleanup & admission loop
    this._cleanupInterval = setInterval(() => this._cleanup(), 15_000);
    this._admitInterval = setInterval(() => this._admitNext(), 2_000);
  }

  /**
   * Enable queue mode.
   */
  enable() {
    this.enabled = true;
    setQueueEnabled(true);
  }

  /**
   * Disable queue mode and clear all state.
   * All users get through immediately after this.
   */
  disable() {
    this.enabled = false;
    setQueueEnabled(false);
    this.activeTokens.clear();
    this.waitingQueue = [];
    this.sessionIndex.clear();
    clearTokens();
  }

  /**
   * Configure queue parameters.
   * @param {{ maxConcurrent?: number, tokenTTL?: number }} opts
   */
  configure(opts) {
    if (opts.maxConcurrent !== undefined && opts.maxConcurrent > 0) {
      this.maxConcurrent = opts.maxConcurrent;
    }
    if (opts.tokenTTL !== undefined && opts.tokenTTL > 0) {
      this.tokenTTL = opts.tokenTTL * 1000; // Convert seconds to ms
    }
  }

  /**
   * Enqueue a new visitor. If capacity is available, admit immediately.
   * @param {string} [existingSessionId] — Resume if they already have a session
   * @returns {{ sessionId: string, position: number, admitted: boolean, token: string|null, estimatedWaitSeconds: number }}
   */
  enqueue(existingSessionId) {
    // If they already have a session, check its status
    if (existingSessionId && this.sessionIndex.has(existingSessionId)) {
      return this.checkStatus(existingSessionId);
    }

    const sessionId = crypto.randomUUID();

    // If there's room, admit immediately
    if (this.activeTokens.size < this.maxConcurrent) {
      const token = this._generateToken();
      this.activeTokens.set(token, {
        sessionId,
        expiresAt: Date.now() + this.tokenTTL,
        lastSeen: Date.now(),
      });
      this.sessionIndex.set(sessionId, token);
      addToken(token);
      return {
        sessionId,
        position: 0,
        admitted: true,
        token,
        estimatedWaitSeconds: 0,
      };
    }

    // Otherwise, add to waiting queue
    this.waitingQueue.push({ sessionId, joinedAt: Date.now() });
    this.sessionIndex.set(sessionId, null);

    const position = this.waitingQueue.findIndex(
      (w) => w.sessionId === sessionId
    ) + 1;

    return {
      sessionId,
      position,
      admitted: false,
      token: null,
      estimatedWaitSeconds: Math.ceil(
        (position * this.avgAdmitInterval) / 1000
      ),
    };
  }

  /**
   * Check the current status of a session.
   * @param {string} sessionId
   * @returns {{ sessionId: string, position: number, admitted: boolean, token: string|null, estimatedWaitSeconds: number }}
   */
  checkStatus(sessionId) {
    if (!this.sessionIndex.has(sessionId)) {
      // Unknown session — treat as new
      return this.enqueue();
    }

    const token = this.sessionIndex.get(sessionId);

    // Already admitted?
    if (token !== null) {
      const entry = this.activeTokens.get(token);
      if (entry && entry.expiresAt > Date.now()) {
        return {
          sessionId,
          position: 0,
          admitted: true,
          token,
          estimatedWaitSeconds: 0,
        };
      }
      // Token expired — they need to re-queue
      this.activeTokens.delete(token);
      this.sessionIndex.delete(sessionId);
      removeToken(token);
      return this.enqueue();
    }

    // Still waiting — find position
    const position = this.waitingQueue.findIndex(
      (w) => w.sessionId === sessionId
    ) + 1;

    if (position === 0) {
      // They were in the index but not in queue (race condition) — re-enqueue
      this.sessionIndex.delete(sessionId);
      return this.enqueue();
    }

    return {
      sessionId,
      position,
      admitted: false,
      token: null,
      estimatedWaitSeconds: Math.ceil(
        (position * this.avgAdmitInterval) / 1000
      ),
    };
  }

  /**
   * Validate a queue_token cookie value.
   * @param {string} token
   * @returns {boolean}
   */
  validateToken(token) {
    if (!token) return false;
    const entry = this.activeTokens.get(token);
    if (!entry) return false;
    if (entry.expiresAt <= Date.now()) {
      // Expired — clean up
      this.sessionIndex.delete(entry.sessionId);
      this.activeTokens.delete(token);
      removeToken(token);
      return false;
    }
    // Extend the token TTL and lastSeen heartbeat
    entry.expiresAt = Date.now() + this.tokenTTL;
    entry.lastSeen = Date.now();
    return true;
  }

  /**
   * Get live stats for admin dashboard.
   */
  getStats() {
    return {
      enabled: this.enabled,
      activeCount: this.activeTokens.size,
      waitingCount: this.waitingQueue.length,
      maxConcurrent: this.maxConcurrent,
      tokenTTLSeconds: this.tokenTTL / 1000,
    };
  }

  // ─── Private methods ───────────────────────────────────────────

  /**
   * Admit the next waiting user(s) if there's capacity.
   * Runs on a 2-second interval.
   */
  _admitNext() {
    if (!this.enabled) return;

    while (
      this.waitingQueue.length > 0 &&
      this.activeTokens.size < this.maxConcurrent
    ) {
      const next = this.waitingQueue.shift();
      if (!next) break;

      const token = this._generateToken();
      this.activeTokens.set(token, {
        sessionId: next.sessionId,
        expiresAt: Date.now() + this.tokenTTL,
        lastSeen: Date.now(),
      });
      this.sessionIndex.set(next.sessionId, token);
      addToken(token);
    }
  }

  /**
   * Clean up expired tokens. Runs every 15 seconds.
   */
  _cleanup() {
    const now = Date.now();
    for (const [token, entry] of this.activeTokens) {
      // Evict if token TTL expired OR no heartbeat received for 60 seconds
      if (entry.expiresAt <= now || now - entry.lastSeen > 60000) {
        this.sessionIndex.delete(entry.sessionId);
        this.activeTokens.delete(token);
        removeToken(token);
      }
    }
  }

  /**
   * Generate a cryptographically random token.
   */
  _generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

// ─── Singleton Export ──────────────────────────────────────────────
// globalThis ensures the same instance survives HMR in dev mode.

const globalKey = '__aetee_queue_engine__';

if (!globalThis[globalKey]) {
  globalThis[globalKey] = new QueueEngine();
}

/** @type {QueueEngine} */
export const queue = globalThis[globalKey];
