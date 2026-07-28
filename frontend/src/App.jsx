import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from  './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import MyListings from "./pages/MyListings";
import EditProduct from "./pages/EditProduct";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";



const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
  )
  }

export default App