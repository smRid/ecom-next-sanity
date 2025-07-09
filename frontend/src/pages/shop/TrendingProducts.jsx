import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCards from './ProductCards'

const TrendingProducts = () => {
    const { products, loading } = useSelector(state => state.products);
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    }

    if (loading) {
        return (
            <section className='section__container product__container'>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            </section>
        );
    }

  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'>
                Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.
            </p>

            <div className='mt-12'>
                <ProductCards products={products.slice(0, visibleProducts)}/>
            </div>

            {/* load button */}

            <div className='product__btn'>
                {
                    visibleProducts < products.length && (
                        <button onClick={loadMoreProducts} className='btn'>
                            Load More
                        </button>
                    )
                }
            </div>
    </section>
  )
}

export default TrendingProducts
