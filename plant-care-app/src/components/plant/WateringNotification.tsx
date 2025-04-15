'use client';

import React from 'react';
import Link from 'next/link';
import { Plant } from '@/types';
import Button from '@/components/ui/Button';

interface WateringNotificationProps {
  plantsToWater: Plant[];
}

export default function WateringNotification({ plantsToWater }: WateringNotificationProps) {
  if (plantsToWater.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-sky-800 p-4 mb-6 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-sky-900">
            {plantsToWater.length}本の植物の水やりが必要です
          </h3>
          <div className="mt-2 text-sm text-sky-800">
            <ul className="list-disc pl-5 space-y-1">
              {plantsToWater.map((plant, index) => (
                <li key={index}>
                  <Link href={`/plant/${plant.id}`} className="font-semibold hover:underline">
                    {plant.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Link href="/calendar">
              <Button variant="secondary" className="text-sm">
                スケジュール確認
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
