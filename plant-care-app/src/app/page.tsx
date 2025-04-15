'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/store';
import { getPlantsFromLocalStorage } from '@/utils/storage';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function HomePage() {
  const { plants, addPlant } = useStore();
  
  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const storedPlants = getPlantsFromLocalStorage();
    if (storedPlants.length > 0 && plants.length === 0) {
      storedPlants.forEach(plant => addPlant(plant));
    }
  }, []);

  // 今日水やりが必要な植物を計算
  const today = new Date();
  const plantsToWaterToday = plants.filter(plant => {
    const lastWatered = new Date(plant.lastWatered);
    const daysSinceLastWatered = Math.floor((today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastWatered >= plant.waterFrequencyDays;
  });

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="px-4 pt-2 pb-24 bg-stone-100 min-h-screen rounded-xl">
      <div className="mb-8">
        
        {plantsToWaterToday.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center">
            <div className="bg-amber-50 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">植物に水やりが必要です！</p>
            </div>
          </div>
        )}
        
        <h2 className="text-xl font-semibold mb-4 pt-2 text-deep-800">WaterMe!</h2>
        
        {plants.length > 0 ? (
          <div className="space-y-4 flex flex-col">
            {plants.map(plant => (
              <Link href={`/plant/${plant.id}`} key={plant.id}>
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-deep-950">{plant.name}</h3>
                    <p className="text-deep-500 text-sm">最終水やり: {getDaysAgo(plant.lastWatered)}日前</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="mb-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-deep-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">植物がまだ登録されてないみたいです</h3>
            <p className="text-deep-500 mb-4">+ボタンから植物を追加しよう！</p>
          </div>
        )}
      </div>
    </div>
  );
}