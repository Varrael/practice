import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => api.getProducts());
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) =>
  api.getProductById(productId),
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    productStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
