import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import styles from './CategoryCard.module.css';

export const CategoryCard = ({ category }) => (
  <Link className={styles.card} to={`/categories/${category.id}`}>
    <div className={styles.imageBox}>
      <img src={category.previewImage || api.getImageUrl(category.image)} alt={category.title} />
    </div>
    <h3>{category.title}</h3>
  </Link>
);
