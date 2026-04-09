import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { figmaAssets } from '../../assets/figmaAssets';
import { BtnCard } from '../BtnCard';
import { api } from '../../services/api';
import styles from './DiscountForm.module.css';

export const DiscountForm = () => {
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

  const onSubmit = async (values) => {
    setStatus('loading');

    try {
      const response = await api.sendSaleRequest(values);
      console.log('Sale request response:', response);
      setStatus('success');
      reset();
    } catch (error) {
      console.error('Sale request failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className={styles.banner}>
          <h2>5% off on the first order</h2>
          <div className={styles.content}>
            <img className={styles.image} src={figmaAssets.discount} alt="" />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.field}>
                <input className={styles.input} placeholder="Name" {...register('name', { required: 'Enter your name' })} />
                {errors.name && <span className={styles.message}>{errors.name.message}</span>}
              </div>
              <div className={styles.field}>
                <input
                  className={styles.input}
                  placeholder="Phone number"
                  {...register('phone', { required: 'Enter your phone number' })}
                />
                {errors.phone && <span className={styles.message}>{errors.phone.message}</span>}
              </div>
              <div className={styles.field}>
                <input
                  className={styles.input}
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
              <BtnCard
                className={`${styles.button} ${status === 'success' ? styles.submitted : ''}`.trim()}
                type="submit"
                variant="banner"
                fullWidth
                selected={status === 'success'}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Request submitted' : 'Get a discount'}
              </BtnCard>
              <div className={styles.messages}>
                {status === 'error' && <span>Failed to send your request.</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
