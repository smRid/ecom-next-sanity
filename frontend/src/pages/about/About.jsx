import React from 'react'
import ecomImage from '../../assets/ecom.jpg'

const About = () => {
  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>About Us</h2>
        <p className='section__subheader'>
          Learn more about our story, mission, and commitment to bringing you the best fashion experience.
        </p>
      </section>

      <section className='section__container'>
        <div className='max-w-4xl mx-auto py-12'>
          <div className='grid md:grid-cols-2 gap-8 items-center mb-12'>
            <div>
              <h3 className='text-2xl font-semibold mb-4'>Our Story</h3>
              <p className='text-gray-600 mb-4'>
                Founded in 2020, Marketopia has been at the forefront of women's fashion, 
                curating the finest collection of clothing, accessories, and beauty products. 
                Our journey began with a simple mission: to make high-quality fashion accessible to everyone.
              </p>
              <p className='text-gray-600'>
                Today, we serve thousands of customers worldwide, offering everything from 
                everyday essentials to statement pieces that help you express your unique style.
              </p>
            </div>
            <div className='rounded-lg overflow-hidden'>
              <img 
                src={ecomImage} 
                alt="Marketopia Company" 
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='text-center'>
              <div className='bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <i className="ri-award-line text-2xl"></i>
              </div>
              <h4 className='text-xl font-semibold mb-2'>Quality First</h4>
              <p className='text-gray-600'>
                We carefully select each product to ensure the highest quality and craftsmanship.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <i className="ri-customer-service-2-line text-2xl"></i>
              </div>
              <h4 className='text-xl font-semibold mb-2'>Customer Care</h4>
              <p className='text-gray-600'>
                Our dedicated support team is here to help you with any questions or concerns.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <i className="ri-truck-line text-2xl"></i>
              </div>
              <h4 className='text-xl font-semibold mb-2'>Fast Shipping</h4>
              <p className='text-gray-600'>
                Quick and reliable delivery to get your fashion finds to you as soon as possible.
              </p>
            </div>
          </div>

          <div className='bg-primary-light p-8 rounded-lg text-center'>
            <h3 className='text-2xl font-semibold mb-4'>Our Mission</h3>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              At <strong>Marketopia</strong>, our mission is to empower confidence and self-expression through fashion. We aim to make style accessible to everyone by offering high-quality, trend-forward clothing, accessories, and footwear at affordable prices. We believe fashion should be effortless, inclusive, and a reflection of individuality, that's why we curate every collection with care, passion, and a commitment to exceptional service.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
