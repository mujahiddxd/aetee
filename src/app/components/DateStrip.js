import React, { useEffect, useState, useRef } from 'react';
import { getISTHour, getISTDateString } from '@/lib/ist-time';

export default function DateStrip({ selectedDate, onDateChange }) {
  const [dates, setDates] = useState([]);
  const stripRef = useRef(null);
  
  // Drag to scroll state
  const isDown = useRef(false);
  const startX = useRef(null);
  const scrollLeft = useRef(null);

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
        const isDisabled = i === 0 && currentISTHour >= 12;

        dateList.push({ dateString, label, dayNum, month, isDisabled });
      }
      setDates(dateList);

      if (dateList.length > 0 && dateList[0].isDisabled && selectedDate === dateList[0].dateString) {
        onDateChange(dateList[1].dateString);
      }
    };
    generateDates();
  }, [selectedDate, onDateChange]);

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
              className={`date-card ${isSelected ? 'selected' : ''} ${item.isDisabled ? 'disabled' : ''}`}
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
              aria-label={item.isDisabled ? `${item.label} unavailable` : `Select ${item.label}`}
            >
              <span className="date-card-label">{item.label}</span>
              <span className="date-card-num">{item.dayNum}</span>
              <span className="date-card-month">{item.month}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
