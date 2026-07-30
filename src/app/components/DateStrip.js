import React, { useEffect, useState, useRef } from 'react';
import { getISTHour, getISTDateString } from '@/lib/ist-time';

export default function DateStrip({ selectedDate, onDateChange }) {
  const [dates, setDates] = useState([]);
  const stripRef = useRef(null);

  useEffect(() => {
    const generateDates = () => {
      const dateList = [];
      const now = new Date();
      const currentISTHour = getISTHour(now);
      const todayISTString = getISTDateString(now);

      // Generate 14 days
      for (let i = 0; i < 14; i++) {
        // Create a new date object, adding 'i' days to 'now'
        const targetDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        const dateString = getISTDateString(targetDate);
        
        // Parse date for display
        const displayDate = new Date(dateString);
        
        let label = '';
        if (i === 0) label = 'Today';
        else if (i === 1) label = 'Tomorrow';
        else {
          label = displayDate.toLocaleDateString('en-US', { weekday: 'short' });
        }

        const dayNum = displayDate.getDate();
        const month = displayDate.toLocaleDateString('en-US', { month: 'short' });

        // Logic for disabling "Today"
        const isDisabled = i === 0 && currentISTHour >= 12;

        dateList.push({
          dateString,
          label,
          dayNum,
          month,
          isDisabled
        });
      }
      setDates(dateList);

      // If the currently selected date is disabled, auto-select tomorrow
      if (dateList.length > 0 && dateList[0].isDisabled && selectedDate === dateList[0].dateString) {
        onDateChange(dateList[1].dateString);
      }
    };

    generateDates();
  }, [selectedDate, onDateChange]);

  return (
    <div className="date-strip-container" ref={stripRef}>
      <div className="date-strip">
        {dates.map((item, index) => {
          const isSelected = selectedDate === item.dateString;
          return (
            <button
              key={index}
              type="button"
              className={`date-card ${isSelected ? 'selected' : ''} ${item.isDisabled ? 'disabled' : ''}`}
              onClick={() => {
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
