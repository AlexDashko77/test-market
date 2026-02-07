import { getApiErrorMessage } from "@/services/apiError";
import { fetchProducts } from "@/services/products.service";
import { Product } from "@/types/product.types";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  loadProducts: async () => {
    try {
      set({ isLoading: true });
      const products = await fetchProducts();
      set({ products });
    } catch (err) {
      const message = getApiErrorMessage(err);
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
