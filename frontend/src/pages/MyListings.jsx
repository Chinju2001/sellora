import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
            console.log(error);
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

            alert("Product deleted successfully!");

            fetchProducts();
        } catch (error) {
            console.log(error);
            alert("Failed to delete product.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="home-container">
                <h2 style={{ margin: "20px" }}>My Listings</h2>

                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    background: "#fff",
                                }}
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    <h3>{product.name}</h3>

                                    <p>
                                        <strong>₹ {product.price}</strong>
                                    </p>

                                    <p>{product.location}</p>
                                </Link>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "15px",
                                    }}
                                >
                                    <Link
                                        to={`/edit-product/${product._id}`}
                                    >
                                        <button
                                            style={{
                                                background: "#2563eb",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 15px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        style={{
                                            background: "#dc2626",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 15px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h3>No products found.</h3>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyListings;