import { create } from 'zustand';

type PrimerSimulacroParams = {
  codeSimulador: string;
  quantity: number;
};

export const usePrimerSimulacroStore = create<{
  params: PrimerSimulacroParams | null;
  setParams: (data: PrimerSimulacroParams) => void;
  clearParams: () => void;
}>((set) => ({
  params: null,
  setParams: (data) => set({ params: data }),
  clearParams: () => set({ params: null }),
}));