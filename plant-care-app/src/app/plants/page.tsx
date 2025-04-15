'use client';

import React from 'react';
import { useStore } from '@/store';
import Link from 'next/link';

const PlantsPage = () => {
  const { plants } = useStore();
  
  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="px-4 pt-6 pb-24 bg-stone-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">WaterMe!</h1>
      
      {plants.length > 0 ? (
        <div className="space-y-4 flex flex-col">
          {plants.map(plant => {
            const daysAgo = getDaysAgo(plant.lastWatered);
            return (
              <Link href={`/plant/${plant.id}`} key={plant.id}>
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{plant.name}</h3>
                    <p className="text-sm text-deep-500">{daysAgo} days ago</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-deep-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">植物がまだ登録されていません</h3>
          <p className="text-deep-500 mb-4">+ボタンで植物を追加しましょう!
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantsPage;