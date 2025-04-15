import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plant } from '../types';
import { savePlantsToLocalStorage } from '../utils/storage';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';

type Store = {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  fetchPlants: (userId: string) => Promise<void>;
  addPlant: (plant: Omit<Plant, 'id'>, userId?: string) => Promise<void>;
  updatePlant: (id: string, updatedPlant: Partial<Plant>) => Promise<void>;
  removePlant: (id: string) => Promise<void>;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      plants: [],
      loading: false,
      error: null,

      // Firestoreからユーザーの植物データを取得
      fetchPlants: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          const plantsRef = collection(db, 'plants');
          const q = query(plantsRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          
          const plants: Plant[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<Plant, 'id'>;
            plants.push({ id: doc.id, ...data });
          });
          
          set({ plants, loading: false });
        } catch (error) {
          console.error('Error fetching plants:', error);
          set({ error: '植物データの取得に失敗しました', loading: false });
        }
      },

      // 新しい植物を追加（Firestoreとローカルストレージのハイブリッドモデル）
      addPlant: async (plant: Omit<Plant, 'id'>, userId?: string) => {
        set({ loading: true, error: null });
        try {
          // ユーザーIDがある場合はFirestoreに保存
          if (userId) {
            const plantWithUser = { ...plant, userId };
            const docRef = await addDoc(collection(db, 'plants'), plantWithUser);
            const newPlant = { id: docRef.id, ...plantWithUser } as Plant;
            set((state) => {
              const newPlants = [...state.plants, newPlant];
              savePlantsToLocalStorage(newPlants); // ローカルにも保存
              return { plants: newPlants, loading: false };
            });
          } else {
            // ユーザーIDがない場合はローカルストレージにのみ保存（従来の動作）
            const id = `plant_${Date.now()}`;
            const newPlant = { id, ...plant } as Plant;
            set((state) => {
              const newPlants = [...state.plants, newPlant];
              savePlantsToLocalStorage(newPlants);
              return { plants: newPlants, loading: false };
            });
          }
        } catch (error) {
          console.error('Error adding plant:', error);
          set({ error: '植物の追加に失敗しました', loading: false });
        }
      },

      // 植物データを更新（Firestoreとローカルストレージのハイブリッドモデル）
      updatePlant: async (id: string, updatedPlant: Partial<Plant>) => {
        set({ loading: true, error: null });
        try {
          // Firestoreの更新（エラーが発生してもローカル更新は続行）
          try {
            const plantRef = doc(db, 'plants', id);
            await updateDoc(plantRef, updatedPlant);
          } catch (error) {
            console.warn('Firebase update failed, continuing with local update:', error);
          }
          
          // ローカルストレージの更新
          set((state) => {
            const newPlants = state.plants.map((plant) => 
              plant.id === id ? { ...plant, ...updatedPlant } : plant
            );
            savePlantsToLocalStorage(newPlants);
            return { plants: newPlants, loading: false };
          });
        } catch (error) {
          console.error('Error updating plant:', error);
          set({ error: '植物の更新に失敗しました', loading: false });
        }
      },

      // 植物を削除（Firestoreとローカルストレージのハイブリッドモデル）
      removePlant: async (id: string) => {
        set({ loading: true, error: null });
        try {
          // Firestoreの削除（エラーが発生してもローカル削除は続行）
          try {
            await deleteDoc(doc(db, 'plants', id));
          } catch (error) {
            console.warn('Firebase delete failed, continuing with local delete:', error);
          }
          
          // ローカルストレージの削除
          set((state) => {
            const newPlants = state.plants.filter((plant) => plant.id !== id);
            savePlantsToLocalStorage(newPlants);
            return { plants: newPlants, loading: false };
          });
        } catch (error) {
          console.error('Error removing plant:', error);
          set({ error: '植物の削除に失敗しました', loading: false });
        }
      },
    }),
    {
      name: 'plants-storage',
    }
  )
);