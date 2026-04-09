import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BtnCard } from '../../components/BtnCard';
import { api } from '../../services/api';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchProductById } from '../../store/slices/productsSlice';
import { formatPrice, getDiscountPercent } from '../../utils/price';
import styles from './ProductPage.module.css';
import pageStyles from '../CatalogPage.module.css';

export const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, productStatus } = useSelector((state) => state.products);
  const isAdded = useSelector((state) => state.cart.items.some((item) => item.id === Number(productId)));

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (productStatus !== 'succeeded' || !product) {
    return null;
  }

  const discountPercent = getDiscountPercent(product);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className={pageStyles.catalogPage}>
      <div className="container">
        <section className={styles.layout}>
          <div className={styles.imageBox}>
            <img src={api.getImageUrl(product.image)} alt={product.title} />
          </div>

          <div className={styles.content}>
            <h1>{product.title}</h1>
            <div className={styles.prices}>
              <span>{formatPrice(product.discont_price ?? product.price)}</span>
              {product.discont_price && <del>{formatPrice(product.price)}</del>}
              {discountPercent && <b className={styles.badge}>-{discountPercent}%</b>}
            </div>

            <div className={styles.controls}>
              <div className={styles.counter}>
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => current + 1)}>
                  +
                </button>
              </div>

              <BtnCard className={styles.cta} type="button" onClick={handleAddToCart} selected={isAdded}>
                {isAdded ? 'Added' : 'Add to cart'}
              </BtnCard>
            </div>

            <div>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
