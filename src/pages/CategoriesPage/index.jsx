import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesList } from '../../components/CategoriesList';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import pageStyles from '../CatalogPage.module.css';

export const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <div className={pageStyles.catalogPage}>
      <div className="container">
        <div className="sectionTitle">
          <h1>Categories</h1>
        </div>
        <CategoriesList categories={categories} compact />
      </div>
    </div>
  );
};
