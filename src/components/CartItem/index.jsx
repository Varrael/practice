import { api } from '../../services/api';
import { formatPrice, getActualPrice } from '../../utils/price';
import styles from './CartItem.module.css';

export const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <article className={styles.item}>
    <div className={styles.imageWrap}>
      <img className={styles.image} src={api.getImageUrl(item.image)} alt={item.title} />
    </div>
    <div className={styles.content}>
      <div className={styles.top}>
        <h3>{item.title}</h3>
        <button className={styles.remove} type="button" onClick={() => onRemove(item.id)}>
          x
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.counter}>
          <button type="button" onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <div className={styles.prices}>
          <span>{formatPrice(getActualPrice(item) * item.quantity)}</span>
          {item.discont_price && <del>{formatPrice(item.price)}</del>}
        </div>
      </div>
    </div>
  </article>
);
