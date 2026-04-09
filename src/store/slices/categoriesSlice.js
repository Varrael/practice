import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () =>
  api.getCategories(),
);

export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchCategoryProducts',
  async (categoryId) => api.getCategoryProducts(categoryId),
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoryProducts: null,
    status: 'idle',
    categoryStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.categoryStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categoryProducts = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
