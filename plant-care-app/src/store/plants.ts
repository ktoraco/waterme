import create from 'zustand';
import { Plant } from '../types';

type PlantStore = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  updatePlant: (id: string, updatedPlant: Partial<Plant>) => void;
  removePlant: (id: string) => void;
};

const usePlantStore = create<PlantStore>((set) => ({
  plants: [],
  addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
  updatePlant: (id, updatedPlant) => set((state) => ({
    plants: state.plants.map((plant) => (plant.id === id ? { ...plant, ...updatedPlant } : plant)),
  })),
  removePlant: (id) => set((state) => ({
    plants: state.plants.filter((plant) => plant.id !== id),
  })),
}));

export default usePlantStore;