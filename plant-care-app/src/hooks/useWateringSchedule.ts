import { useEffect, useState } from 'react';
import { Plant } from '../types';

const useWateringSchedule = (plants: Plant[]) => {
  const [wateringSchedule, setWateringSchedule] = useState<Plant[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const schedule = plants.filter(plant => {
      const lastWateredDate = new Date(plant.lastWatered);
      const nextWateringDate = new Date(lastWateredDate);
      nextWateringDate.setDate(lastWateredDate.getDate() + plant.waterFrequencyDays);
      return nextWateringDate.toISOString().split('T')[0] === today;
    });
    setWateringSchedule(schedule);
  }, [plants]);

  return wateringSchedule;
};

export default useWateringSchedule;