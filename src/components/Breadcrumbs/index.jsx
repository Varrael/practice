import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = ({ items }) => (
  <nav className={styles.breadcrumbs} aria-label="breadcrumbs">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <span key={item.label} className={styles.item}>
          {item.to && !isLast ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      );
    })}
  </nav>
);
