import { useShallow } from '@/hooks';
import { create } from 'zustand';

interface T {
  isOpen: { [key: string]: boolean };

  setIsOpen: (id: string) => void;
}

export const collapseStore = create<T>((set) => ({
  isOpen: {},

  setIsOpen: (id) => set((state) => ({ isOpen: { ...state.isOpen, [id]: !state.isOpen[id] } })),
}));

export const useCollapseStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(collapseStore, keys);
};
