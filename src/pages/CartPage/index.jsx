import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BtnCard } from '../../components/BtnCard';
import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import { api } from '../../services/api';
import { clearCart, removeFromCart, setItemQuantity } from '../../store/slices/cartSlice';
import { formatPrice, getActualPrice } from '../../utils/price';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [status, setStatus] = useState('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + getActualPrice(item) * item.quantity, 0);

  const handleOrderSubmit = async (values) => {
    setStatus('loading');

    try {
      await api.sendOrder({
        ...values,
        products: items,
        totalCount,
        totalPrice,
      });
      setStatus('success');
      reset();
      dispatch(clearCart());
    } catch {
      setStatus('error');
    }
  };

  if (items.length === 0 && status !== 'success') {
    return (
      <div className="pageContent">
        <div className="container">
          <div className="sectionTitle">
            <h1>Shopping cart</h1>
          </div>
          <EmptyState
            title="Shopping cart"
            description="Looks like you have no items in your basket currently."
            actionLabel="Continue Shopping"
            actionTo="/products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pageContent">
      <div className="container">
        <div className="sectionTitle">
          <h1>Shopping cart</h1>
          <Link to="/products">Back to the store</Link>
        </div>

        <div className={styles.layout}>
          <div className={styles.items}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={(id) => dispatch(removeFromCart(id))}
                onQuantityChange={(id, quantity) => dispatch(setItemQuantity({ id, quantity }))}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.summaryTop}>
              <h2>Order details</h2>
              <p className={styles.count}>{totalCount} items</p>
              <div className={styles.total}>
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(handleOrderSubmit)}>
              <div className={styles.field}>
                <input placeholder="Name" {...register('name', { required: 'Enter your name' })} />
                {errors.name && <span className={styles.message}>{errors.name.message}</span>}
              </div>
              <div className={styles.field}>
                <input placeholder="Phone number" {...register('phone', { required: 'Enter your phone number' })} />
                {errors.phone && <span className={styles.message}>{errors.phone.message}</span>}
              </div>
              <div className={styles.field}>
                <input
                  placeholder="Email"
                  {...register('email', {
                    required: 'Enter your email',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Incorrect email',
                    },
                  })}
                />
                {errors.email && <span className={styles.message}>{errors.email.message}</span>}
              </div>
              <BtnCard type="submit" fullWidth disabled={status === 'loading' || status === 'success'} selected={status === 'success'}>
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'The Order is Placed' : 'Order'}
              </BtnCard>
              <div className={styles.messages}>
                {status === 'error' && <span>Could not complete the order.</span>}
              </div>
            </form>
          </aside>
        </div>
      </div>

      {status === 'success' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.modalClose} type="button" onClick={() => setStatus('idle')}>
              x
            </button>
            <h3>Congratulations!</h3>
            <p>
              Your order has been successfully placed on the website. A manager will contact you shortly to confirm your
              order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
