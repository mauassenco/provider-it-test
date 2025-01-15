import { create } from 'zustand';

type AuthType = {
  hasUser: boolean;
  isLoading: boolean;
  isCreated: boolean;
  setIsCreated: (newState: boolean) => void;
  setIsloading: (newState: boolean) => void;
  setHasUser: (newState: boolean) => void;
  removeToken: () => void;
};

export const useLoginStore = create<AuthType>((set) => ({
  hasUser: false,
  isLoading: false,
  isCreated: false,
  setIsCreated: (newState) => set({ isCreated: newState }),
  setIsloading: (newState) => set({ isLoading: newState }),
  setHasUser: (newState) => set({ hasUser: newState }),
  removeToken: () => {
    set({});
    localStorage.removeItem('user_token');
  },
}));
