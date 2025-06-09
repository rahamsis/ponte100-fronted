import { create } from 'zustand';

type PrimeraPracticeParams = {
  quantity: number;
};

export const usePrimeraPracticaStore = create<{
  params: PrimeraPracticeParams | null;
  setParams: (data: PrimeraPracticeParams) => void;
  clearParams: () => void;
}>((set) => ({
  params: null,
  setParams: (data) => set({ params: data }),
  clearParams: () => set({ params: null }),
}));