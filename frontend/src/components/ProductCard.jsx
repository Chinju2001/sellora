import React from 'react'
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({id,name,price,location}) => {
  return (
    <div className='product-card'>
<div className="product-image">
    📷
    <span>No Image</span>
</div>
       <h4 className='product-price'>₹ {price}</h4>
       <h3 className='product-name'>{name}</h3>
        <p className='product-location'>{location}</p>
      <Link to={`/product/${id}`}>
  <button className="product-button">
    View details
  </button>
</Link>
    </div>
  )
}

export default ProductCard