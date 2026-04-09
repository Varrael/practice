import { ProductCard } from '../ProductCard';
import styles from './ProductsGrid.module.css';

export const ProductsGrid = ({ products }) => (
  <div className={styles.grid}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
