import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { DiscountedProductsPage } from './pages/DiscountedProductsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'categories/:categoryId', element: <CategoryProductsPage /> },
      { path: 'products', element: <AllProductsPage /> },
      { path: 'sales', element: <DiscountedProductsPage /> },
      { path: 'products/:productId', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
