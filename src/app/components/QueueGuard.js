"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * QueueGuard — Client-side queue enforcement.
 *
 * On every page navigation, checks /api/queue/validate to see if the
 * queue is enabled and whether the user has a valid queue_token cookie.
 * If not, redirects to /queue.
 *
 * This runs in the browser, so it CAN reliably reach the Node.js API
 * (unlike Edge Runtime middleware which can't access in-memory state).
 */
export default function QueueGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Paths that should never be blocked
    const exempt = ["/queue", "/admin", "/api"];
    if (exempt.some((p) => pathname.startsWith(p))) return;

    let cancelled = false;

    async function checkQueue() {
      try {
        const res = await fetch("/api/queue/validate", {
          credentials: "include", // Send cookies
        });
        if (!res.ok) return; // Fail-open
        const data = await res.json();

        if (!cancelled && data.enabled && !data.valid) {
          router.replace("/queue");
        }
      } catch (e) {
        // Fail-open — don't block users on network errors
      }
    }

    checkQueue();

    // Ping every 30 seconds to maintain the slot (heartbeat)
    const interval = setInterval(checkQueue, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pathname, router]);

  return null; // Invisible component
}
