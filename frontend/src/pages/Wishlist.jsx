import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiArrowLeft } from "react-icons/fi";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const wishlist =
                JSON.parse(
                    localStorage.getItem("wishlist")
                ) || [];

            if (wishlist.length === 0) {
                setProducts([]);
                return;
            }

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            const wishlistProducts =
                res.data.products.filter(
                    (product) =>
                        wishlist.includes(product._id)
                );

            setProducts(wishlistProducts);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="wishlist-page">

                <div className="wishlist-header">

                    <button
                        className="wishlist-back"
                        onClick={() => navigate(-1)}
                    >
                        <FiArrowLeft />
                        Back
                    </button>

                    <div className="wishlist-title">

                        <div className="wishlist-icon">
                            <FiHeart />
                        </div>

                        <div>
                            <h1>My Wishlist</h1>

                            <p>
                                Products you've saved
                            </p>
                        </div>

                    </div>

                </div>


                {loading ? (

                    <div className="wishlist-message">
                        Loading wishlist...
                    </div>

                ) : products.length === 0 ? (

                    <div className="empty-wishlist">

                        <FiHeart />

                        <h2>
                            Your wishlist is empty
                        </h2>

                        <p>
                            Save products you like and
                            find them here later.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                        >
                            Explore Products
                        </button>

                    </div>

                ) : (

                    <div className="wishlist-products">

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                location={product.location}
                            />

                        ))}

                    </div>

                )}

            </div>
        </>
    );
};

export default Wishlist;