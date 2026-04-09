import { Link } from 'react-router-dom';
import { figmaAssets } from '../../assets/figmaAssets';
import { BtnCard } from '../BtnCard';
import styles from './HeroSection.module.css';

export const HeroSection = () => (
  <section className={styles.hero}>
    <img className={styles.image} src={figmaAssets.hero} alt="" />
    <div className={`container ${styles.content}`}>
      <h1>Amazing Discounts on Garden Products!</h1>
      <BtnCard as={Link} className={styles.button} to="/sales">
        Check out
      </BtnCard>
    </div>
  </section>
);
