import React from 'react'
import { Link, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import RatingStars from '../../components/RatingStars';
import productsData from '../../data/products.json';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    // Find the product by ID
    const product = productsData.find(p => p._id === parseInt(id));
    
    // Handle add to cart
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };
    
    // If product not found, show error
    if (!product) {
        return (
            <div className='section__container mt-8 text-center'>
                <h2 className='text-2xl font-semibold mb-4'>Product Not Found</h2>
                <p className='text-gray-600 mb-6'>The product you're looking for doesn't exist.</p>
                <Link to="/shop" className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark'>
                    Back to Shop
                </Link>
            </div>
        );
    }
  return (
    <>
        <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Product Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'>{product.name}</span>
                </div>
            </section>

        <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                   <div className='md:w-1/2 w-full'>
                   <img src={product.image} alt={product.name}
                        className='rounded-md w-full h-auto'/>
                   </div> 
                   
                   <div className='md:w-1/2 w-full'>
                         <h3 className='text-2xl font-semibold mb-4'>
                            {product.name}
                         </h3>
                         <p className='text-xl text-primary mb-4 space-x-1'>
                            ${product.price} {product.oldPrice && <s>${product.oldPrice}</s>}
                         </p>
                         <p className='text-gray-400 mb-4'>
                            {product.description}
                         </p>
                         
                         <div className='space-y-2 mb-6'>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Color:</strong> {product.color}</p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating:</strong>
                                <RatingStars rating={product.rating} />
                                <span className='text-gray-500 ml-2'>({product.rating})</span>
                            </div>
                            {product.author && <p><strong>Author:</strong> {product.author}</p>}
                         </div>

                            <button 
                                onClick={handleAddToCart}
                                className='mt-6 px-6 py-3 bg-primary text-white rounded-md flex items-center gap-2 hover:bg-primary-dark transition-all duration-300'
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                                Add to Cart
                            </button>
                   </div>
                </div>
        </section>


    </>
  )
}

export default SingleProduct
