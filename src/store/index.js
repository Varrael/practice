import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

const loadCart = () => {
  try {
    const rawCart = localStorage.getItem('garden-cart');
    return rawCart ? JSON.parse(rawCart) : [];
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCart(),
    },
  },
});

store.subscribe(() => {
  localStorage.setItem('garden-cart', JSON.stringify(store.getState().cart.items));
});
