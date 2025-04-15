import React, { useState, useMemo } from 'react';
import useWateringSchedule from '../../hooks/useWateringSchedule';
import { useStore } from '@/store';
import Link from 'next/link';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CalendarView: React.FC = () => {
  const { plants } = useStore();
  const wateringPlantsToday = useWateringSchedule(plants);
  const [currentDate] = useState(new Date());

  // 日付別の水やりスケジュールを作成
  const wateringSchedule = useMemo(() => {
    const schedule: Record<string, typeof plants> = {};
    
    plants.forEach(plant => {
      if (!plant.lastWatered) return;
      
      const lastWateredDate = new Date(plant.lastWatered);
      const nextWateringDate = new Date(lastWateredDate);
      nextWateringDate.setDate(lastWateredDate.getDate() + plant.waterFrequencyDays);
      
      const dateString = nextWateringDate.toISOString().split('T')[0];
      if (!schedule[dateString]) schedule[dateString] = [];
      schedule[dateString].push(plant);
    });
    
    return schedule;
  }, [plants]);

  // カレンダー表示用の日付配列を生成
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // 前月の日を追加
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // 当月の日を追加
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const plantsForDate = wateringSchedule[dateString] || [];
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        hasWatering: plantsForDate.length > 0,
        plants: plantsForDate
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // 今日の水やりが必要な植物を表示
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="py-2">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((dayObj, index) => (
            <div 
              key={index} 
              className={`aspect-square flex items-center justify-center ${
                dayObj.isCurrentMonth 
                  ? 'text-gray-800' 
                  : 'text-gray-300'
              }`}
            >
              {dayObj.day && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {dayObj.day}
                  {dayObj.hasWatering && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 h-1.5 w-1.5 rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-3">今日</h2>
        {wateringPlantsToday.length > 0 ? (
          <div className="space-y-3">
            {wateringPlantsToday.map(plant => (
              <div key={plant.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <Link href={`/plant/${plant.id}`} className="flex-1">
                  <h3 className="font-medium">{plant.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-gray-500">本日予定されている水やりはありません</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;