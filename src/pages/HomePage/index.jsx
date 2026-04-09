import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeroSection } from '../../components/HeroSection';
import { CategoriesList } from '../../components/CategoriesList';
import { DiscountForm } from '../../components/DiscountForm';
import { ProductsGrid } from '../../components/ProductsGrid';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import { getDiscountPercent } from '../../utils/price';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);
  const saleProducts = products
    .filter((product) => product.discont_price)
    .sort((firstProduct, secondProduct) => getDiscountPercent(secondProduct) - getDiscountPercent(firstProduct))
    .slice(0, 4);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }

    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [categoriesStatus, dispatch, productsStatus]);

  return (
    <>
      <HeroSection />

      <section className={styles.categoriesSection}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Categories</h2>
            <Link to="/categories">All categories</Link>
          </div>
          {categories.length > 0 && <CategoriesList categories={categories.slice(0, 4)} />}
        </div>
      </section>

      <DiscountForm />

      <section className={styles.saleSection}>
        <div className="container">
          <div className="sectionTitle">
            <h2>Sale</h2>
            <Link to="/sales">All sales</Link>
          </div>
          {saleProducts.length > 0 && <ProductsGrid products={saleProducts} />}
        </div>
      </section>
    </>
  );
};
