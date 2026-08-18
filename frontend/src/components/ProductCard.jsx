import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import {
    FiMapPin,
    FiHeart,
    FiImage
} from "react-icons/fi";

const ProductCard = ({
    id,
    name,
    price,
    location,
    image,
}) => {

    const [isWishlisted, setIsWishlisted] =
        useState(false);

    /* =========================
       CHECK WISHLIST
    ========================= */

    useEffect(() => {

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        setIsWishlisted(
            wishlist.some(
                (product) =>
                    product._id === id
            )
        );

    }, [id]);


    /* =========================
       TOGGLE WISHLIST
    ========================= */

    const toggleWishlist = () => {

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        const alreadyWishlisted =
            wishlist.some(
                (product) =>
                    product._id === id
            );

        let updatedWishlist;

        if (alreadyWishlisted) {

            updatedWishlist =
                wishlist.filter(
                    (product) =>
                        product._id !== id
                );

            setIsWishlisted(false);

        } else {

            const product = {
                _id: id,
                name,
                price,
                location,
                image,
            };

            updatedWishlist = [
                ...wishlist,
                product,
            ];

            setIsWishlisted(true);
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        // Notify Wishlist page
        window.dispatchEvent(
            new Event("wishlistUpdated")
        );
    };


    return (
        <div className="product-card">

            {/* =========================
                WISHLIST
            ========================= */}

            <button
                className={`wishlist-btn ${
                    isWishlisted
                        ? "wishlisted"
                        : ""
                }`}
                onClick={toggleWishlist}
                aria-label={
                    isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                }
            >
                <FiHeart
                    fill={
                        isWishlisted
                            ? "currentColor"
                            : "none"
                    }
                />
            </button>


            {/* =========================
                PRODUCT IMAGE
            ========================= */}

            <div className="product-image">

                {image ? (

                    <img
                        src={image}
                        alt={name}
                        className="product-card-image"
                    />

                ) : (

                    <div className="image-placeholder">

                        <FiImage size={34} />

                        <span>
                            No Image Available
                        </span>

                    </div>

                )}

            </div>


            {/* =========================
                PRODUCT DETAILS
            ========================= */}

            <div className="product-content">

                <p className="product-price">
                    ₹{" "}
                    {Number(price).toLocaleString()}
                </p>

                <h3 className="product-name">
                    {name}
                </h3>

                <p className="product-location">
                    <FiMapPin />
                    {location}
                </p>

                <Link
                    to={`/product/${id}`}
                    className="details-link"
                >
                    View Details →
                </Link>

            </div>

        </div>
    );
};

export default ProductCard;