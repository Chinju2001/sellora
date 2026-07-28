import React from 'react'
import "./Navbar.css";

const categories = [
  "Electronics",
  "Mobiles",
  "Vehicles",
  "Furniture",
  "Fashion",
  "Books",
  "Home Appliances",
  "Others"
];

const CategoryList = () => {
  return (
 <div className='categories-container'>
    {
      categories.map((category, index) => (
    <button className="category-list" key={index}>
        {category}
    </button>
))
    }
 </div>

  )
}

export default CategoryList