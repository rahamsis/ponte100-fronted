import { create } from 'zustand';

type PracticeParams = {
  selectedTheme: string;
  quantity: number;
};

export const usePracticeStore = create<{
  params: PracticeParams | null;
  setParams: (data: PracticeParams) => void;
  clearParams: () => void;
}>((set) => ({
  params: null,
  setParams: (data) => set({ params: data }),
  clearParams: () => set({ params: null }),
}));