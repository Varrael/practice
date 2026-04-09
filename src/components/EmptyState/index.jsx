import { Link } from 'react-router-dom';
import { BtnCard } from '../BtnCard';
import styles from './EmptyState.module.css';

export const EmptyState = ({ title, description, actionLabel = 'Continue shopping', actionTo = '/products' }) => (
  <div className={styles.state}>
    <p>{description}</p>
    <BtnCard as={Link} className={styles.action} to={actionTo}>
      {actionLabel}
    </BtnCard>
  </div>
);
