import React from 'react'
import { Link } from 'react-router'
import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4>UP TO 25% DISCOUNT ON</h4>
        <h1>Trendy Fashion</h1>
        <p>Discover the latest trends, timeless classics, and exclusive drops—all in one place. From street-chic to sophisticated staples, our curated collections are designed for every season, every story, and every you.</p>
        <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
      </div>
      <div className='header__image'>
        <img src={bannerImg} alt="bannerImg" />
      </div>
    </div>
  )
}

export default Banner
