import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from '../redux/features/cart/cartSlice';
import { fetchProducts } from '../redux/features/products/productsSlice';

export const useAppInitialization = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Load products from API
        dispatch(fetchProducts());
        
        // Load existing cart from backend
        dispatch(loadCart());
    }, [dispatch]);
};
