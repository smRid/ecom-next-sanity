import React from 'react'
import { Link } from 'react-router-dom'

import category1 from '../../assets/category1.png'
import category2 from '../../assets/category2.png'  
import category3 from '../../assets/category3.png'
import category4 from '../../assets/category4.png'

const Categories = () => {
  
    const categories = [
      {name: 'Accessories', path: 'accessories', image: category1},
      {name: 'Dress Collection', path: 'dress', image: category2},
      {name: 'Tops Wear', path: 'top', image: category3},
      {name: 'Bottoms Wear', path: 'bottom', image: category4},
    ]

    return (

    <>
      <div className="product__grid">
        {
          categories.map((category) => (
            <Link key={category.name} to={`/categories/${category.path}`}
            className='categories__card'>
              <img src={category.image} alt={category.name} />
              <h4>{category.name}</h4>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default Categories
