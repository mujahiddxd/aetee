import React, { useEffect, useState, useRef } from 'react';
import { getISTHour, getISTDateString } from '@/lib/ist-time';

export default function DateStrip({ selectedDate, onDateChange }) {
  const [dates, setDates] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState(new Set());
  const [blockedDates, setBlockedDates] = useState(new Set());
  const stripRef = useRef(null);
  
  // Drag to scroll state
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);

  // Fetch unavailable dates (at capacity + admin-disabled) on mount
  useEffect(() => {
    let cancelled = false;

    const fetchCapacity = async () => {
      try {
        const res = await fetch('/api/delivery-dates/capacity');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            if (data.fullyBookedDates) setFullyBookedDates(new Set(data.fullyBookedDates));
            if (data.blockedDates) setBlockedDates(new Set(data.blockedDates));
          }
        }
      } catch (err) {
        // Silently fail — worst case the user sees all dates as available
        // and the backend will reject at checkout if the date is actually full
        console.error('Failed to fetch date capacity:', err);
      }
    };

    fetchCapacity();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const generateDates = () => {
      const dateList = [];
      const now = new Date();
      const currentISTHour = getISTHour(now);

      for (let i = 0; i < 62; i++) {
        const targetDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        const dateString = getISTDateString(targetDate);
        const displayDate = new Date(dateString);
        
        let label = '';
        if (i === 0) label = 'Today';
        else if (i === 1) label = 'Tomorrow';
        else label = displayDate.toLocaleDateString('en-US', { weekday: 'short' });

        const dayNum = displayDate.getDate();
        const month = displayDate.toLocaleDateString('en-US', { month: 'short' });
        const isPastCutoff = i === 0 && currentISTHour >= 12;
        const isBlocked = blockedDates.has(dateString);
        // A disabled date is unavailable regardless of how full it is
        const isFullyBooked = !isBlocked && fullyBookedDates.has(dateString);
        const isDisabled = isPastCutoff || isFullyBooked || isBlocked;

        dateList.push({ dateString, label, dayNum, month, isDisabled, isFullyBooked, isBlocked });
      }
      setDates(dateList);

      const currentSelected = dateList.find(d => d.dateString === selectedDate);
      if (currentSelected && currentSelected.isDisabled) {
        const firstAvailable = dateList.find(d => !d.isDisabled);
        if (firstAvailable) {
          onDateChange(firstAvailable.dateString);
        }
      }
    };
    generateDates();
  }, [selectedDate, onDateChange, fullyBookedDates, blockedDates]);

  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    isDown.current = true;
    isDragging.current = false;
    stripRef.current.classList.add('active-drag');
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
  };
  const handleMouseLeave = () => {
    isDown.current = false;
    stripRef.current.classList.remove('active-drag');
  };
  const handleMouseUp = () => {
    isDown.current = false;
    stripRef.current.classList.remove('active-drag');
    // We don't reset isDragging here so onClick can see it was a drag
    setTimeout(() => { isDragging.current = false; }, 50);
  };
  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // scroll-fast
    
    // Only consider it a drag if moved more than 5px
    if (Math.abs(x - startX.current) > 5) {
      isDragging.current = true;
    }
    
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div 
      className="date-strip-container" 
      ref={stripRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="date-strip">
        {dates.map((item, index) => {
          const isSelected = selectedDate === item.dateString;
          return (
            <button
              key={index}
              type="button"
              className={`date-card ${isSelected ? 'selected' : ''} ${item.isDisabled ? 'disabled' : ''} ${item.isFullyBooked ? 'fully-booked' : ''} ${item.isBlocked ? 'blocked' : ''}`}
              onClick={(e) => {
                if (isDragging.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (!item.isDisabled) {
                  onDateChange(item.dateString);
                }
              }}
              disabled={item.isDisabled}
              aria-label={
                item.isBlocked
                  ? `${item.label} not available for delivery`
                  : item.isFullyBooked
                    ? `${item.label} fully booked`
                    : item.isDisabled
                      ? `${item.label} unavailable`
                      : `Select ${item.label}`
              }
            >
              <span className="date-card-label">{item.label}</span>
              <span className="date-card-num">{item.dayNum}</span>
              <span className="date-card-month">
                {item.isBlocked ? 'N/A' : item.isFullyBooked ? 'Full' : item.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
