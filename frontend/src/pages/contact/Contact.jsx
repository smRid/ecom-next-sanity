import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Contact Us</h2>
        <p className='section__subheader'>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      <section className='section__container'>
        <div className='max-w-6xl mx-auto py-12'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Get in Touch</h3>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className="ri-map-pin-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-1'>Address</h4>
                    <p className='text-gray-600'>
                      123, London Bridge Street<br />
                      London<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className="ri-phone-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-1'>Phone</h4>
                    <p className='text-gray-600'>(+880) 1857 395</p>
                    <p className='text-gray-600'>Mon-Fri 9AM-6PM</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className="ri-mail-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-1'>Email</h4>
                    <p className='text-gray-600'>support@marketopia.com</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className="ri-time-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-1'>Business Hours</h4>
                    <p className='text-gray-600'>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className='mt-8'>
                <h4 className='font-semibold mb-4'>Follow Us</h4>
                <div className='flex gap-4'>
                  <a href="#" className='bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors'>
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="#" className='bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors'>
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a href="#" className='bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors'>
                    <i className="ri-twitter-line"></i>
                  </a>
                  <a href="#" className='bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors'>
                    <i className="ri-linkedin-fill"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                      placeholder='Enter your name'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                      placeholder='Enter your email'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-2'>
                    Subject *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    placeholder='What is this regarding?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none'
                    placeholder='Tell us how we can help you...'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium'
                >
                  Send Message
                  <i className="ri-send-plane-line ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
