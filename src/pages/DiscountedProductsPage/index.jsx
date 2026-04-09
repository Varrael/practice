import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductsGrid } from '../../components/ProductsGrid';
import { fetchProducts } from '../../store/slices/productsSlice';
import { filterAndSortProducts } from '../../utils/productFilters';
import pageStyles from '../CatalogPage.module.css';

const defaultFilters = {
  minPrice: '',
  maxPrice: '',
  discountOnly: true,
  sort: 'default',
};

export const DiscountedProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => filterAndSortProducts(products, filters), [filters, products]);

  const handleFiltersChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className={pageStyles.catalogPage}>
      <div className="container">
        <div className="sectionTitle">
          <h1>Discounted items</h1>
        </div>
        <FilterPanel filters={filters} onChange={handleFiltersChange} showDiscountToggle={false} />
        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
};
