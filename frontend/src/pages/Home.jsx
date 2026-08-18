import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";

import { useSearch } from "../context/SearchContext";

import "./Home.css";

const Home = () => {
    const [products, setProducts] = useState([]);

    const { searchTerm } = useSearch();

    const [searchParams, setSearchParams] =
        useSearchParams();

    const selectedCategory =
        searchParams.get("category") || "";

    const selectedLocation =
        searchParams.get("location") || "";

    const selectedPrice =
        searchParams.get("price") || "";

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

        /* SEARCH */

        const matchesSearch =
            !search ||
            product.name
                ?.toLowerCase()
                .includes(search) ||
            product.category
                ?.toLowerCase()
                .includes(search) ||
            product.location
                ?.toLowerCase()
                .includes(search);

        /* CATEGORY */

        const matchesCategory =
            !selectedCategory ||
            product.category?.toLowerCase() ===
                selectedCategory.toLowerCase();

        /* LOCATION */

        const matchesLocation =
            !selectedLocation ||
            product.location?.toLowerCase() ===
                selectedLocation.toLowerCase();

        /* PRICE */

        let matchesPrice = true;

        const price = Number(product.price);

        if (selectedPrice === "under-5000") {
            matchesPrice = price < 5000;
        }

        if (selectedPrice === "5000-15000") {
            matchesPrice =
                price >= 5000 && price <= 15000;
        }

        if (selectedPrice === "15000-50000") {
            matchesPrice =
                price > 15000 && price <= 50000;
        }

        if (selectedPrice === "above-50000") {
            matchesPrice = price > 50000;
        }

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesPrice
        );
    });

    const clearFilters = () => {
        setSearchParams({});
    };

    const hasFilters =
        selectedCategory ||
        selectedLocation ||
        selectedPrice;

    return (
        <div>
            <Navbar />

            <HeroSection />

            <CategoryList />

            {/* =========================
                FILTER BAR
            ========================= */}

            <div className="filter-bar">

                {/* LOCATION */}

                <select
                    value={selectedLocation}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (value) {
                            searchParams.set(
                                "location",
                                value
                            );
                        } else {
                            searchParams.delete(
                                "location"
                            );
                        }

                        setSearchParams(searchParams);
                    }}
                >
                    <option value="">
                        All Locations
                    </option>

                    <option value="Kochi">
                        Kochi
                    </option>

                    <option value="Thrissur">
                        Thrissur
                    </option>

                    <option value="Trivandrum">
                        Trivandrum
                    </option>

                    <option value="Kozhikode">
                        Kozhikode
                    </option>

                    <option value="Alappuzha">
                        Alappuzha
                    </option>

                    <option value="Kottayam">
                        Kottayam
                    </option>

                    <option value="Palakkad">
                        Palakkad
                    </option>
                </select>

                {/* PRICE */}

                <select
                    value={selectedPrice}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (value) {
                            searchParams.set(
                                "price",
                                value
                            );
                        } else {
                            searchParams.delete(
                                "price"
                            );
                        }

                        setSearchParams(searchParams);
                    }}
                >
                    <option value="">
                        All Prices
                    </option>

                    <option value="under-5000">
                        Under ₹5,000
                    </option>

                    <option value="5000-15000">
                        ₹5,000 – ₹15,000
                    </option>

                    <option value="15000-50000">
                        ₹15,000 – ₹50,000
                    </option>

                    <option value="above-50000">
                        Above ₹50,000
                    </option>
                </select>

                {/* CLEAR */}

                {hasFilters && (
                    <button
                        className="clear-category-button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                )}

            </div>

            {/* =========================
                RECOMMENDATIONS HEADER
            ========================= */}

            <div className="recommendations-header">

                <h2 className="home-title">
                    {selectedCategory
                        ? `${selectedCategory} Products`
                        : selectedLocation
                        ? `${selectedLocation} Products`
                        : "Fresh Recommendations"}
                </h2>

            </div>

            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="products-container">

                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            location={product.location}
                            image={product.image}
                        />
                    ))

                ) : (

                    <h3
                        style={{
                            textAlign: "center",
                            marginTop: "40px",
                            width: "100%",
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