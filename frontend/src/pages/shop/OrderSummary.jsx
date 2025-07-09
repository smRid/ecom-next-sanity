import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

const OrderSummary = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderForm, setOrderForm] = useState({
        name: '',
        email: '',
        address: ''
    })

    const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOrderForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckout = () => {
        setIsModalOpen(true)
    }

    const handleSubmitOrder = (e) => {
        e.preventDefault()
        // Simulate order placement
        alert(`Order placed successfully!\nName: ${orderForm.name}\nEmail: ${orderForm.email}\nAddress: ${orderForm.address}\nTotal: $${grandTotal.toFixed(2)}`)
        
        // Clear cart and close modal
        dispatch(clearCart())
        setIsModalOpen(false)
        setOrderForm({ name: '', email: '', address: '' })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setOrderForm({ name: '', email: '', address: '' })
    }

  return (
    <>
    <div className='bg-primary-light mt-5 rounded text-base'>
      <div className='px-6 py-4 space-y-5'>
        <h2 className='text-xl text-text-dark'>
            Order Summary
        </h2>
        <p className='text-text-dark mt-2'>
            SelectedItems: {selectedItems}
        </p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>
        <h3 className='font-bold'>GrandTotal: ${grandTotal.toFixed(2)}</h3>
        <div className='px-4 mb-6'>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClearCart();
                }}
                className='bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4'
            >
                <span className='mr-2'>Clear cart</span> 
                <i className="ri-delete-bin-7-line"></i>
            </button>
            <button
                onClick={handleCheckout}
                className='bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center'
            >
                <span className='mr-2'>Proceed Checkout</span><i className="ri-bank-card-line"></i>
            </button>
        </div>
      </div>
    </div>

    {/* Checkout Modal */}
    {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold'>Checkout</h2>
                    <button 
                        onClick={closeModal}
                        className='text-gray-500 hover:text-gray-700'
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                
                <form onSubmit={handleSubmitOrder} className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                            Name *
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={orderForm.name}
                            onChange={handleInputChange}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='Enter your full name'
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                            Email *
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={orderForm.email}
                            onChange={handleInputChange}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='Enter your email address'
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-1'>
                            Address *
                        </label>
                        <textarea
                            id='address'
                            name='address'
                            value={orderForm.address}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='Enter your complete address'
                        />
                    </div>
                    
                    <div className='border-t pt-4 mt-4'>
                        <div className='flex justify-between text-sm text-gray-600 mb-2'>
                            <span>Total Items:</span>
                            <span>{selectedItems}</span>
                        </div>
                        <div className='flex justify-between text-sm text-gray-600 mb-2'>
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between text-sm text-gray-600 mb-2'>
                            <span>Tax ({taxRate * 100}%):</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between font-bold text-lg border-t pt-2'>
                            <span>Grand Total:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className='flex gap-3 mt-6'>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )}
    </>
  )
}

export default OrderSummary
