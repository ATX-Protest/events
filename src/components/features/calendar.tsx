'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarEvent {
  date: string;
  title: string;
  id: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar({ events = [], onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const dateKey = event.date;
    acc[dateKey] ??= [];
    acc[dateKey].push(event);
    return acc;
  }, {});

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const formatDateKey = (day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-card border rounded-lg p-4 md:p-6" data-testid="calendar">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Previous month"
          data-testid="calendar-prev"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold" data-testid="calendar-month-year">
          {MONTHS[month]} {year}
        </h2>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Next month"
          data-testid="calendar-next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateKey = formatDateKey(day);
          const dayEvents = eventsByDate[dateKey] ?? [];
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              type="button"
              key={day}
              onClick={() => handleDateClick(day)}
              className={cn(
                'aspect-square flex flex-col items-center justify-center rounded-md text-sm transition-colors relative',
                'hover:bg-muted',
                isToday(day) && 'bg-primary/10 font-semibold',
                isSelected(day) && 'bg-primary text-primary-foreground hover:bg-primary/90',
                hasEvents && !isSelected(day) && 'font-medium'
              )}
              data-testid={`calendar-day-${day}`}
            >
              <span>{day}</span>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-1 h-1 rounded-full',
                        isSelected(day) ? 'bg-primary-foreground' : 'bg-primary'
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
