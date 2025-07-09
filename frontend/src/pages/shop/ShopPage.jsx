import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { setSelectedCategory, filterByPriceRange, resetFilters } from '../../redux/features/products/productsSlice';

const filters = {
    categories: ['all', 'accessories', 'dress', 'top', 'bottom'],
    colors: ['all', 'black', 'white', 'red', 'gold', 'blue', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity }
    ]
};

const ShopPage = () => {
    const dispatch = useDispatch();
    const { filteredProducts, loading, error } = useSelector(state => state.products);
    
    const[filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })

    useEffect(() => {
        // Apply category filter
        if(filtersState.category && filtersState.category !== 'all') {
            dispatch(setSelectedCategory(filtersState.category));
        } else {
            dispatch(setSelectedCategory('all'));
        }

        // Apply price range filter
        if(filtersState.priceRange) {
            const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
            dispatch(filterByPriceRange({ min: minPrice, max: maxPrice }));
        }
    }, [filtersState, dispatch]);

    //clear filters function
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
        dispatch(resetFilters());
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>Discover the Hottest Picks: Evevate Your Style with Our Curated Collection of Trendy Fashion Products.</p>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>

            {/* Left side */}
            <ShopFiltering 
            filters={filters} 
            filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters}/>

            {/* Right side */}
            <div>
                <h3 className='text-xl font-medium mb-4'>Products Available: {filteredProducts.length}</h3>
                <ProductCards products={filteredProducts}/>
            </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage
