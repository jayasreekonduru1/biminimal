import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('https://bee-minimal-api.onrender.com/products');
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch products');
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
    'products/fetchBestSellers',
    async () => {
        try {
          const response = await axios.get('https://bee-minimal-api.onrender.com/products');
          const products = response.data;
          
          // Iterate over products and select bestsellers
          const bestSellers = [];
          products.forEach(product => {
            if (product.bestseller) {
              bestSellers.push(product);
            }
          });
    
          return bestSellers; // Return only the bestseller products
        } catch (error) {
          throw new Error('Failed to fetch best sellers');
        }
      }
  );

  export const fetchBabyCareProducts = createAsyncThunk(
    'products/fetchBabyCareProducts',
    async () => {
      try {
        const response = await axios.get('https://bee-minimal-api.onrender.com/products');
        const products = response.data.filter(product => product.category === 'Baby Care');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch Baby Care products');
      }
    }
  );

  export const fetchHairCareProducts = createAsyncThunk(
    'products/fetchHairCareProducts',
    async () => {
      try {
        const response = await axios.get('https://bee-minimal-api.onrender.com/products');
        const products = response.data.filter(product => product.category === 'Hair Care');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch Hair Care products');
      }
    }
  );

  export const fetchSkinBodyCareProducts = createAsyncThunk(
    'products/fetchSkinBodyCareProducts',
    async () => {
      try {
        const response = await axios.get('https://bee-minimal-api.onrender.com/products');
        const products = response.data.filter(product => product.category === 'Skin Body Care');
        return products;
      } catch (error) {
        throw new Error('Failed to fetch Hair Care products');
      }
    }
  );

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    bestSellers:[],
    babyCare: [],
    hairCare: [],
    skinbodyCare:[],
    status: 'idle',
    error: null,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bestSellers = action.payload;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBabyCareProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBabyCareProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.babyCare = action.payload;
      })
      .addCase(fetchBabyCareProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchHairCareProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHairCareProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hairCare = action.payload;
      })
      .addCase(fetchHairCareProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSkinBodyCareProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkinBodyCareProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skinbodyCare = action.payload;
      })
      .addCase(fetchSkinBodyCareProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
