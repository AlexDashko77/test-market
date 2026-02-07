"use client";
import { useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { useAuthStore } from "@/store/auth.store";
import { useProductsStore } from "@/store/products.store";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./ProductList.module.scss";

export const ProductsList = () => {
  const { products, loadProducts, isLoading, error } = useProductsStore();
  const { user } = useAuthStore();
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className={styles.errorWrapper}>
        <ErrorMessage message={error} />
      </div>
    );
  return (
    <>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} isAuth={!!user} />
      ))}
    </>
  );
};
