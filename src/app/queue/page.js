"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import './queue.css';

export default function QueuePage() {
  const router = useRouter();
  const [status, setStatus] = useState({
    sessionId: null,
    position: 0,
    admitted: false,
    estimatedWaitSeconds: 0,
    bypassed: false,
  });
  const [joining, setJoining] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const pollRef = useRef(null);
  const sessionIdRef = useRef(null);

  // Join the queue on mount
  useEffect(() => {
    let cancelled = false;

    async function joinQueue() {
      try {
        const res = await fetch('/api/queue/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        });
        const data = await res.json();

        if (cancelled) return;

        if (data.bypassed) {
          // Queue is off — go straight through
          router.replace('/');
          return;
        }

        sessionIdRef.current = data.sessionId;
        setStatus(data);
        setJoining(false);
      } catch (err) {
        console.error('Failed to join queue:', err);
        // On error, let user through to avoid blocking
        if (!cancelled) router.replace('/');
      }
    }

    joinQueue();
    return () => { cancelled = true; };
  }, [router]);

  // Poll for status updates
  useEffect(() => {
    if (joining || status.admitted || status.bypassed) return;

    function poll() {
      pollRef.current = setInterval(async () => {
        if (!sessionIdRef.current) return;

        try {
          const res = await fetch(`/api/queue/status?sessionId=${sessionIdRef.current}`);
          const data = await res.json();

          if (data.bypassed || data.admitted) {
            setStatus(prev => ({ ...prev, ...data, admitted: true }));
            clearInterval(pollRef.current);
          } else {
            setStatus(prev => ({ ...prev, ...data }));
          }
        } catch (err) {
          console.error('Queue poll error:', err);
        }
      }, 3000);
    }

    poll();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [joining, status.admitted, status.bypassed]);

  // Countdown & redirect when admitted
  useEffect(() => {
    if (!status.admitted) return;

    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status.admitted, router]);

  const formatETA = useCallback((seconds) => {
    if (seconds <= 0) return 'any moment now';
    if (seconds < 60) return `~${seconds} seconds`;
    const mins = Math.ceil(seconds / 60);
    return `~${mins} minute${mins > 1 ? 's' : ''}`;
  }, []);

  // ─── Render ────────────────────────────────────────────────────

  // Loading state
  if (joining) {
    return (
      <div className="queue-container">
        <div className="queue-card">
          <div className="queue-logo">Aetee&apos;s Bakehouse</div>
          <div className="queue-icon-wrapper">
            <span className="queue-icon">🧁</span>
          </div>
          <p style={{ color: '#826356', fontSize: '0.95rem' }}>Connecting you to the queue...</p>
          <div className="queue-status-row" style={{ marginTop: '16px' }}>
            <div className="queue-dots">
              <div className="queue-dot" />
              <div className="queue-dot" />
              <div className="queue-dot" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admitted — success state
  if (status.admitted) {
    return (
      <div className="queue-container">
        <div className="queue-card queue-admitted">
          <div className="queue-logo">Aetee&apos;s Bakehouse</div>
          <div className="queue-admitted-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="queue-admitted-title">You&apos;re In!</h1>
          <p className="queue-admitted-text">
            Thank you for your patience. Redirecting you to the store in {countdown}...
          </p>
          <button className="queue-enter-btn" onClick={() => router.replace('/')}>
            Enter Now
          </button>
        </div>
      </div>
    );
  }

  // Waiting state
  return (
    <div className="queue-container">
      <div className="queue-card">
        <div className="queue-logo">Aetee&apos;s Bakehouse</div>

        <div className="queue-icon-wrapper">
          <span className="queue-icon">🧁</span>
        </div>

        <h1 className="queue-title">We&apos;re Experiencing High Demand</h1>
        <p className="queue-subtitle">
          You&apos;re in our virtual queue. Please hold tight — we&apos;ll get you in shortly!
          This page updates automatically.
        </p>

        <div className="queue-position-wrapper">
          <div className="queue-position-label">Your Position</div>
          <div className="queue-position-number">#{status.position}</div>
          <div className="queue-eta">
            Estimated wait: {formatETA(status.estimatedWaitSeconds)}
          </div>
        </div>

        <div className="queue-progress-track">
          <div
            className="queue-progress-bar"
            style={{
              width: status.position <= 1 ? '95%' : status.position <= 5 ? '75%' : status.position <= 20 ? '50%' : status.position <= 50 ? '30%' : '15%',
            }}
          />
        </div>

        <div className="queue-status-row">
          <span>Waiting for your turn</span>
          <div className="queue-dots">
            <div className="queue-dot" />
            <div className="queue-dot" />
            <div className="queue-dot" />
          </div>
        </div>
      </div>

      <p className="queue-footer">
        Please don&apos;t close this tab. You&apos;ll be automatically redirected once it&apos;s your turn.
        Your session is valid for 10 minutes after entry.
      </p>
    </div>
  );
}
