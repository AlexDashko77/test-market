import { api } from "./api";
import { Product } from "@/types/product.types";

export const fetchProducts = async () => {
  const res = await api.get<{ products: Product[] }>("/products?limit=12");
  return res.data.products;
};
