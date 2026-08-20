"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getISTDateString } from "@/lib/ist-time";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Build a 'YYYY-MM-DD' string from calendar parts (no timezone involved). */
function toDateString(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Pretty label for the disabled-dates table, e.g. "Fri, 05 Sep 2026". */
function formatLong(dateStr) {
  return new Date(`${dateStr}T00:00:00.000Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlockedDates() {
  const [blockedDates, setBlockedDates] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Today in IST — the storefront's notion of "today"
  const todayStr = useMemo(() => getISTDateString(), []);
  const [viewYear, setViewYear] = useState(() => Number(todayStr.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(() => Number(todayStr.slice(5, 7)) - 1);

  const blockedSet = useMemo(
    () => new Set(blockedDates.map((b) => b.date)),
    [blockedDates]
  );

  const fetchBlockedDates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blocked-dates", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch disabled dates");
      }
      const data = await res.json();
      setBlockedDates(data.blockedDates || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlockedDates();
  }, [fetchBlockedDates]);

  // ── Calendar grid ────────────────────────────────────────────────
  const cells = useMemo(() => {
    const firstWeekday = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();

    const grid = [];
    for (let i = 0; i < firstWeekday; i++) grid.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = toDateString(viewYear, viewMonth, day);
      grid.push({
        day,
        dateStr,
        isPast: dateStr < todayStr,
        isToday: dateStr === todayStr,
        isBlocked: blockedSet.has(dateStr),
      });
    }
    return grid;
  }, [viewYear, viewMonth, todayStr, blockedSet]);

  const goToMonth = (delta) => {
    const next = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    setViewYear(next.getUTCFullYear());
    setViewMonth(next.getUTCMonth());
  };

  // Don't let the admin page back past the current month
  const currentYear = Number(todayStr.slice(0, 4));
  const currentMonth = Number(todayStr.slice(5, 7)) - 1;
  const canGoBack =
    viewYear > currentYear || (viewYear === currentYear && viewMonth > currentMonth);

  const toggleDay = (cell) => {
    if (!cell || cell.isPast || cell.isBlocked) return;
    setNotice("");
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cell.dateStr)) next.delete(cell.dateStr);
      else next.add(cell.dateStr);
      return next;
    });
  };

  // ── Mutations ────────────────────────────────────────────────────
  const handleDisable = async () => {
    if (selected.size === 0) return;
    const dates = [...selected].sort();
    const plural = dates.length > 1;
    const confirmMsg =
      `Disable delivery on ${dates.length} date${plural ? "s" : ""}?\n\n` +
      `${dates.join("\n")}\n\n` +
      `Customers will no longer be able to select ${plural ? "these dates" : "this date"} at checkout.`;
    if (!confirm(confirmMsg)) return;

    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates, reason: reason.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to disable the selected dates");

      setSelected(new Set());
      setReason("");
      setNotice(
        `Disabled ${data.blocked} date${data.blocked === 1 ? "" : "s"}.` +
          (data.alreadyBlocked ? ` ${data.alreadyBlocked} were already disabled.` : "")
      );
      await fetchBlockedDates();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReEnable = async (entry) => {
    const warning = entry.orderCount > 0
      ? `\n\nNote: ${entry.orderCount} order${entry.orderCount > 1 ? "s are" : " is"} already booked on this date.`
      : "";
    if (!confirm(`Re-enable delivery on ${formatLong(entry.date)}?${warning}`)) return;

    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/admin/blocked-dates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates: [entry.date] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to re-enable the date");

      setNotice(`${formatLong(entry.date)} is available for delivery again.`);
      await fetchBlockedDates();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Delivery Dates</h1>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>
          Disabled Dates: {blockedDates.length}
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(255,59,48,0.1)", color: "#ff3b30", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      {notice && (
        <div style={{ background: "rgba(34,197,94,0.12)", color: "#15803d", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {notice}
        </div>
      )}

      {/* ── Calendar picker ─────────────────────────────────────── */}
      <div className="card mb-lg">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Select dates to disable</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button type="button" className="btn btn-secondary" onClick={() => goToMonth(-1)} disabled={!canGoBack} style={{ padding: "6px 14px" }}>
              &lsaquo;
            </button>
            <strong style={{ minWidth: "150px", textAlign: "center", color: "var(--color-text-main)" }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </strong>
            <button type="button" className="btn btn-secondary" onClick={() => goToMonth(1)} style={{ padding: "6px 14px" }}>
              &rsaquo;
            </button>
          </div>
        </div>

        <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "16px" }}>
          Click a day to select it. Selected days are disabled only once you press
          &ldquo;Disable Selected Dates&rdquo;. Already-disabled days are shown in red — re-enable them from the table below.
        </p>

        <div className="blocked-calendar">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="blocked-calendar-weekday">{wd}</div>
          ))}
          {cells.map((cell, i) =>
            cell === null ? (
              <div key={`pad-${i}`} className="blocked-calendar-pad" />
            ) : (
              <button
                key={cell.dateStr}
                type="button"
                onClick={() => toggleDay(cell)}
                disabled={cell.isPast || cell.isBlocked}
                className={[
                  "blocked-calendar-day",
                  cell.isPast ? "is-past" : "",
                  cell.isToday ? "is-today" : "",
                  cell.isBlocked ? "is-blocked" : "",
                  selected.has(cell.dateStr) ? "is-selected" : "",
                ].filter(Boolean).join(" ")}
                title={
                  cell.isBlocked
                    ? "Already disabled"
                    : cell.isPast
                      ? "Past date"
                      : `Select ${cell.dateStr}`
                }
              >
                {cell.day}
              </button>
            )
          )}
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", marginTop: "20px", flexWrap: "wrap" }}>
          <div className="input-group" style={{ flex: 1, minWidth: "220px", margin: 0 }}>
            <label>Reason (optional)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Closed for Diwali"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={submitting}
              maxLength={255}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {selected.size > 0 && (
              <button type="button" className="btn btn-secondary" onClick={() => setSelected(new Set())} disabled={submitting} style={{ height: "42px" }}>
                Clear ({selected.size})
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={handleDisable} disabled={submitting || selected.size === 0} style={{ height: "42px" }}>
              {submitting ? "Saving..." : `Disable Selected Date${selected.size === 1 ? "" : "s"}`}
            </button>
          </div>
        </div>
      </div>

      {/* ── Currently disabled dates ────────────────────────────── */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Disabled Date</th>
              <th>Reason</th>
              <th width="140">Existing Orders</th>
              <th width="140">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>Loading disabled dates...</td>
              </tr>
            ) : blockedDates.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  No disabled dates. Every upcoming date is available for delivery.
                </td>
              </tr>
            ) : (
              blockedDates.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ paddingLeft: "16px" }}>
                    <strong style={{ fontSize: "1.05rem", color: "var(--color-text-main)" }}>
                      {formatLong(entry.date)}
                    </strong>
                  </td>
                  <td style={{ color: "var(--color-text-muted)" }}>{entry.reason || "—"}</td>
                  <td>
                    {entry.orderCount > 0 ? (
                      <span style={{ color: "#b45309", fontWeight: 700 }}>{entry.orderCount}</span>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)" }}>0</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleReEnable(entry)}
                      disabled={submitting}
                      style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                    >
                      Re-enable
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
