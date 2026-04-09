import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../services/api';
import { BtnCard } from '../BtnCard';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPrice, getActualPrice, getDiscountPercent } from '../../utils/price';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isAdded = useSelector((state) => state.cart.items.some((item) => item.id === product.id));
  const discountPercent = getDiscountPercent(product);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link className={styles.card} to={`/products/${product.id}`}>
      <div className={styles.imageBox}>
        <img src={product.previewImage || api.getImageUrl(product.image)} alt={product.title} />
        {discountPercent && <span className={styles.badge}>-{discountPercent}%</span>}
        <BtnCard className={styles.action} type="button" onClick={handleAddToCart} selected={isAdded}>
          {isAdded ? 'Added' : 'Add to cart'}
        </BtnCard>
      </div>

      <div className={styles.info}>
        <h3>{product.title}</h3>
        <div className={styles.prices}>
          <span className={styles.actualPrice}>{formatPrice(getActualPrice(product))}</span>
          {product.discont_price && <span className={styles.oldPrice}>{formatPrice(product.price)}</span>}
        </div>
      </div>
    </Link>
  );
};
