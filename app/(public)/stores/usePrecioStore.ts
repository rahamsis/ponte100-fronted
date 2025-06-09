// stores/usePrecioStore.ts
import { create } from "zustand";

type Product = {
  nombre: string | null;
  precio: number | null;
};

type ProductStore = {
  producto: Product | null;
  token: string | null;           // token es string o null
  setProducto: (producto: Product) => void;
  setToken: (token: string) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  producto: null,
  token: null,
  setProducto: (producto) => set({ producto }),
  setToken: (token) => set({ token }),
}));
