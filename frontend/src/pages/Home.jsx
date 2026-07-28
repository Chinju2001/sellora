import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";

import { useSearch } from "../context/SearchContext";

import "./Home.css";

const Home = () => {
    const [products, setProducts] = useState([]);

    const { searchTerm } = useSearch();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data.products);
        } catch (error) {
            console.error(error);
        }
    };

 const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    return (
        product.name?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search) ||
        product.location?.toLowerCase().includes(search)
    );
});

    return (
        <div>
            <Navbar />

            <CategoryList />

            <h2>Fresh Recommendations</h2>

            <div className="products-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            location={product.location}
                        />
                    ))
                ) : (
                    <h3
                        style={{
                            textAlign: "center",
                            marginTop: "40px",
                        }}
                    >
                        No products found.
                    </h3>
                )}
            </div>
        </div>
    );
};

export default Home;