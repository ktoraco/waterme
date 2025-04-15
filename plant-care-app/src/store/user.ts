import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Profile = {
  id: string;
  name: string;
};

type UserStore = {
  profiles: Profile[];
  activeProfileId: string | null;
  addProfile: (name: string) => void;
  switchProfile: (id: string) => void;
  getActiveProfile: () => Profile | null;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,
      
      addProfile: (name) => {
        const newProfile: Profile = {
          id: `profile_${Date.now()}`,
          name
        };
        
        set((state) => ({
          profiles: [...state.profiles, newProfile],
          activeProfileId: newProfile.id
        }));
      },
      
      switchProfile: (id) => {
        set({ activeProfileId: id });
      },
      
      getActiveProfile: () => {
        const { profiles, activeProfileId } = get();
        if (!activeProfileId) return null;
        return profiles.find(p => p.id === activeProfileId) || null;
      }
    }),
    {
      name: 'user-profiles'
    }
  )
);