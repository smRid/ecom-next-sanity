import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsAPI } from '../../../services/api'

const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    selectedCategory: 'all',
    searchQuery: ''
}

// Async thunks for products operations
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productsAPI.getAllProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await productsAPI.getProductById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category, { rejectWithValue }) => {
        try {
            const response = await productsAPI.getProductsByCategory(category);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            if (action.payload === 'all') {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    product => product.category.toLowerCase() === action.payload.toLowerCase()
                );
            }
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            const query = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        },
        filterByPriceRange: (state, action) => {
            const { min, max } = action.payload;
            state.filteredProducts = state.products.filter(
                product => product.price >= min && product.price <= max
            );
        },
        sortProducts: (state, action) => {
            const sortBy = action.payload;
            state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
                switch (sortBy) {
                    case 'price-low-to-high':
                        return a.price - b.price;
                    case 'price-high-to-low':
                        return b.price - a.price;
                    case 'rating':
                        return b.rating - a.rating;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            });
        },
        resetFilters: (state) => {
            state.filteredProducts = state.products;
            state.selectedCategory = 'all';
            state.searchQuery = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch products by category
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { 
    setSelectedCategory, 
    setSearchQuery, 
    filterByPriceRange, 
    sortProducts, 
    resetFilters 
} = productsSlice.actions;

export default productsSlice.reducer;
