'use client';

import React from 'react';
import CalendarView from '@/components/calendar/CalendarView';

const CalendarPage = () => {
  return (
    <div className="px-4 pt-6 pb-24 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Calendar</h1>
      <CalendarView />
    </div>
  );
};

export default CalendarPage;