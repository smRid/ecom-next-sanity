import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartAPI } from '../../../services/api'

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
    loading: false,
    error: null
}

// Async thunks for cart operations
export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await cartAPI.getCart();
            return response.data;
        } catch (error) {
            if (error.message === 'Cart not found') {
                return initialState;
            }
            return rejectWithValue(error.message);
        }
    }
);

export const saveCart = createAsyncThunk(
    'cart/saveCart',
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await cartAPI.saveCart(cartData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearCartAPI = createAsyncThunk(
    'cart/clearCartAPI',
    async (_, { rejectWithValue }) => {
        try {
            await cartAPI.clearCart();
            return initialState;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:(state, action) => {
            const isExist = state.products.find(
            (product) => product._id === action.payload._id
         );

         if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                console.log("Items already added");
            }

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },
        updateQuantity: (state, action) => {
          state.products = state.products.map((product) => {
            if(product._id === action.payload.id) {
              if(action.payload.type === 'increment'){
                  product.quantity += 1;
                } else if(action.payload.type === 'decrement'){
                  if(product.quantity > 1) {
                    product.quantity -= 1
                  }
                }
            }
            return product;
        });
        state.selectedItems = setSelectedItems(state);
        state.totalPrice = setTotalPrice(state);
        state.tax = setTax(state);
        state.grandTotal = setGrandTotal(state);
        },
        removeFromCart: (state, action) => {
          state.products = state.products.filter((product) => product._id !== action.payload.id);
          state.selectedItems = setSelectedItems(state);
          state.totalPrice = setTotalPrice(state);
          state.tax = setTax(state);
          state.grandTotal = setGrandTotal(state);
        },
        clearCart: (state) => {
          state.products = [];
          state.selectedItems = 0;
          state.totalPrice = 0;
          state.tax = 0;
          state.grandTotal = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // Load cart
            .addCase(loadCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
                state.selectedItems = action.payload.selectedItems || 0;
                state.totalPrice = action.payload.totalPrice || 0;
                state.tax = action.payload.tax || 0;
                state.taxRate = action.payload.taxRate || 0.05;
                state.grandTotal = action.payload.grandTotal || 0;
            })
            .addCase(loadCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save cart
            .addCase(saveCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(saveCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear cart API
            .addCase(clearCartAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartAPI.fulfilled, (state) => {
                state.loading = false;
                state.products = [];
                state.selectedItems = 0;
                state.totalPrice = 0;
                state.tax = 0;
                state.grandTotal = 0;
            })
            .addCase(clearCartAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


// utilities functions
export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity);
  }, 0);

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const setTax = (state) => Number(setTotalPrice(state) * state.taxRate);

export const setGrandTotal = (state) => {
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;