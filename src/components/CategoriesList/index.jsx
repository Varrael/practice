import { CategoryCard } from '../CategoryCard';
import styles from './CategoriesList.module.css';

export const CategoriesList = ({ categories, compact = false }) => (
  <div className={compact ? `${styles.grid} ${styles.compact}` : styles.grid}>
    {categories.map((category) => (
      <CategoryCard key={category.id} category={category} />
    ))}
  </div>
);
