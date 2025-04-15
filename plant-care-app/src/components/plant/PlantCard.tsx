import React from 'react';
import { Plant } from '../../types';
import Link from 'next/link';

type PlantCardProps = {
  plant: Plant;
  onWater?: (id: string) => void;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, onWater }) => {
  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysAgo = getDaysAgo(plant.lastWatered);
  const needsWater = daysAgo >= plant.waterFrequencyDays;

  return (
    <Link href={`/plant/${plant.id}`}>
      <div className={`bg-white rounded-xl p-4 shadow-sm flex items-center ${needsWater ? 'border border-amber-300' : ''}`}>
        <div className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{plant.name}</h3>
          <p className="text-gray-500 text-sm">最終水やり: {daysAgo}日前</p>
        </div>
        {onWater && needsWater && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWater(plant.id);
            }}
            className="ml-2 bg-blue-50 text-blue-600 p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        )}
      </div>
    </Link>
  );
};

export default PlantCard;