import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import {
    FiEdit2,
    FiTrash2,
    FiMapPin,
    FiPackage,
    FiImage,
} from "react-icons/fi";

import "./MyListings.css";

const MyListings = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/products/my-products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts(res.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

        } catch (error) {
            console.error(error);

            alert("Failed to delete product.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="my-listings-container">

                {/* PAGE HEADER */}

                <div className="page-header">

                    <span className="page-badge">
                        MY DASHBOARD
                    </span>

                    <h1>My Listings</h1>

                    <p>
                        Manage all your products in one place.
                    </p>

                </div>

                {/* EMPTY STATE */}

                {products.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            <FiPackage />
                        </div>

                        <h2>No Listings Yet</h2>

                        <p>
                            Start selling by adding your first product.
                        </p>

                        <Link
                            to="/add-product"
                            className="primary-btn"
                        >
                            + Add Product
                        </Link>

                    </div>

                ) : (

                    <div className="listings-grid">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="listing-card"
                            >

                                {/* IMAGE */}

                                <div className="listing-image">

                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    ) : (
                                        <div className="listing-image-placeholder">
                                            <FiImage />
                                            <span>
                                                No Image Available
                                            </span>
                                        </div>
                                    )}

                                </div>

                                {/* CONTENT */}

                                <div className="listing-content">

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p className="listing-price">
                                        ₹{" "}
                                        {Number(
                                            product.price
                                        ).toLocaleString()}
                                    </p>

                                    <p className="location">
                                        <FiMapPin />
                                        {product.location}
                                    </p>

                                    {/* ACTIONS */}

                                    <div className="listing-buttons">

                                        <Link
                                            to={`/edit-product/${product._id}`}
                                            className="edit-btn"
                                        >
                                            <FiEdit2 />
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteProduct(
                                                    product._id
                                                )
                                            }
                                        >
                                            <FiTrash2 />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
};

export default MyListings;