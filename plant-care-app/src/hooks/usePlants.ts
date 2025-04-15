import { useEffect, useState } from 'react';
import { Plant } from '../types';

const usePlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const storedPlants = localStorage.getItem('plants');
      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      }
    };

    fetchPlants();
  }, []);

  const addPlant = (newPlant: Plant) => {
    setPlants((prevPlants) => {
      const updatedPlants = [...prevPlants, newPlant];
      localStorage.setItem('plants', JSON.stringify(updatedPlants));
      return updatedPlants;
    });
  };

  const updatePlant = (updatedPlant: Plant) => {
    setPlants((prevPlants) => {
      const updatedPlants = prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
      localStorage.setItem('plants', JSON.stringify(updatedPlants));
      return updatedPlants;
    });
  };

  const deletePlant = (plantId: string) => {
    setPlants((prevPlants) => {
      const updatedPlants = prevPlants.filter((plant) => plant.id !== plantId);
      localStorage.setItem('plants', JSON.stringify(updatedPlants));
      return updatedPlants;
    });
  };

  return {
    plants,
    addPlant,
    updatePlant,
    deletePlant,
  };
};

export default usePlants;