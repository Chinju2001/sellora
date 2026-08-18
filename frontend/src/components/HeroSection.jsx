import React from "react";
import { useNavigate } from "react-router-dom";

import "./HeroSection.css";

import {
    FiArrowRight,
    FiShoppingBag,
    FiSmartphone,
    FiTruck,
    FiHome
} from "react-icons/fi";

const HeroSection = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        const productsSection =
            document.querySelector(".products-container");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    const handleSell = () => {
        navigate("/add-product");
    };

    return (
        <section className="hero">

            <div className="hero-left">

                <span className="hero-tag">
                    Buy • Sell • Discover
                </span>

                <h1>
                    Find Amazing Deals <br />
                    Near You
                </h1>

                <p>
                    Buy and sell pre-owned products safely
                    with people in your local community.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={handleExplore}
                    >
                        <FiShoppingBag />
                        Explore Products
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={handleSell}
                    >
                        + Sell Now
                        <FiArrowRight />
                    </button>

                </div>

            </div>

            <div className="hero-right">

                <div className="floating-card phone">
                    <FiSmartphone />
                    <span>Mobiles</span>
                </div>

                <div className="floating-card vehicle">
                    <FiTruck />
                    <span>Vehicles</span>
                </div>

                <div className="floating-card furniture">
                    <FiHome />
                    <span>Furniture</span>
                </div>

            </div>

        </section>
    );
};

export default HeroSection;