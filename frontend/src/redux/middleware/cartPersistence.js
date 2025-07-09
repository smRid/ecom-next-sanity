import { saveCart } from '../features/cart/cartSlice';

// Middleware to automatically save cart to backend
export const cartPersistenceMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    
    // Only save cart for cart-related actions
    if (action.type.startsWith('cart/') && 
        !action.type.includes('saveCart') && 
        !action.type.includes('loadCart') && 
        !action.type.includes('clearCartAPI')) {
        
        const state = store.getState();
        const cartData = {
            products: state.cart.products,
            selectedItems: state.cart.selectedItems,
            totalPrice: state.cart.totalPrice,
            tax: state.cart.tax,
            taxRate: state.cart.taxRate,
            grandTotal: state.cart.grandTotal
        };
        
        // Dispatch save cart action with a small delay to batch multiple changes
        setTimeout(() => {
            store.dispatch(saveCart(cartData));
        }, 500);
    }
    
    return result;
};
