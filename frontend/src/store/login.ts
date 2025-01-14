import { create } from 'zustand';

type AuthType = {
  auth: boolean;
  hasUser: boolean;
  isLoading: boolean;
  isCreated: boolean;
  setAuth: (newState: boolean) => void;
  setIsCreated: (newState: boolean) => void;
  setIsloading: (newState: boolean) => void;
  setHasUser: (newState: boolean) => void;
  removeToken: () => void;
};

export const useLoginStore = create<AuthType>((set) => ({
  auth: false,
  hasUser: false,
  isLoading: false,
  isCreated: false,
  setAuth: (newState) => set({ auth: newState }),
  setIsCreated: (newState) => set({ isCreated: newState }),
  setIsloading: (newState) => set({ isLoading: newState }),
  setHasUser: (newState) => set({ hasUser: newState }),
  removeToken: () => {
    set({});
    localStorage.removeItem('user_token');
  },
}));
