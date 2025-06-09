import { create } from 'zustand';

type PreguntasFallidasParams = {
  failledQuantity: string;
  quantity: number;
};

export const usePreguntasFallidasStore = create<{
  params: PreguntasFallidasParams | null;
  setParams: (data: PreguntasFallidasParams) => void;
  clearParams: () => void;
}>((set) => ({
  params: null,
  setParams: (data) => set({ params: data }),
  clearParams: () => set({ params: null }),
}));