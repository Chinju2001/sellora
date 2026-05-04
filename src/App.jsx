import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'

const App = () => {
  return (
      <div>
        <h1>Local Market Place</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
  )
  }

export default App