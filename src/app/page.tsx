import { ProductsList } from "@/components/ProductsList/ProductsList";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.grid}>
      <ProductsList />
    </div>
  );
}
