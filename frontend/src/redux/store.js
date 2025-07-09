import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import productsReducer from './features/products/productsSlice'
import { cartPersistenceMiddleware } from './middleware/cartPersistence'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistenceMiddleware),
})