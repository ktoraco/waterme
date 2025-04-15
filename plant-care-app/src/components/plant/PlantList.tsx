import React from 'react';
import usePlants from '../../hooks/usePlants';
import PlantCard from './PlantCard';

const PlantList: React.FC = () => {
  const { plants } = usePlants();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;