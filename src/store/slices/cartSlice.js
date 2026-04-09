import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: action.payload.quantity || 1,
      });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItemQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id);

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
