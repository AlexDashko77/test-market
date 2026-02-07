import { Product } from "@/types/product.types";
import styles from "./ProductCard.module.scss";
import Image from "next/image";

interface Props {
  product: Product;
  isAuth: boolean;
}

export const ProductCard = ({ product, isAuth }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image className={styles.img} src={product.thumbnail} fill alt={product.title} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>

          {isAuth && <button className={styles.button}>Add to cart</button>}
        </div>
      </div>
    </div>
  );
};
