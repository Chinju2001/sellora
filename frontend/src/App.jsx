import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import EditProduct from "./pages/EditProduct";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import MyChats from "./pages/MyChats";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoutes";
import Footer from "./components/Footer";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme") || "light";

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );
    }, []);

    const hideFooter =
        location.pathname === "/login" ||
        location.pathname === "/signup";

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route
                    path="/chat/:conversationId"
                    element={<Chat />}
                />
                <Route
                    path="/my-chats"
                    element={<MyChats />}
                />
                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />
 <Route
    path="/admin"
    element={
        <AdminRoute>
            <AdminDashboard />
        </AdminRoute>
    }
/>
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>

            {!hideFooter && <Footer />}
        </div>
    );
};

export default App;