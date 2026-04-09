import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductsGrid } from '../../components/ProductsGrid';
import { fetchCategoryProducts } from '../../store/slices/categoriesSlice';
import { filterAndSortProducts } from '../../utils/productFilters';
import pageStyles from '../CatalogPage.module.css';

const defaultFilters = {
  minPrice: '',
  maxPrice: '',
  discountOnly: false,
  sort: 'default',
};

export const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { categoryProducts, categoryStatus } = useSelector((state) => state.categories);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryId));
  }, [categoryId, dispatch]);

  const products = categoryProducts?.data || [];
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
          <h1>{categoryProducts?.category?.title || 'Category products'}</h1>
        </div>

        {categoryStatus === 'succeeded' && (
          <>
            <FilterPanel filters={filters} onChange={handleFiltersChange} />
            <ProductsGrid products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  );
};
