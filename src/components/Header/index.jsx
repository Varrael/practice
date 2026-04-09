import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { figmaAssets } from '../../assets/figmaAssets';
import storeLogo from '../../assets/store-logo.svg';
import styles from './Header.module.css';

export const Header = () => {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.wrapper}`}>
        <Link className={styles.logo} to="/">
          <img src={storeLogo} alt="Garden shop logo" />
        </Link>

        <nav className={styles.nav}>
          <NavLink className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)} to="/">
            Main Page
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            to="/categories"
          >
            Categories
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            to="/products"
          >
            All products
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            to="/sales"
          >
            All sales
          </NavLink>
        </nav>

        <Link className={styles.cart} to="/cart" aria-label="Shopping cart">
          <img src={totalItems > 0 ? figmaAssets.basketFull : figmaAssets.basket} alt="" />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
};
