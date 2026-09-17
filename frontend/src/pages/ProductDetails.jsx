import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
    FiMapPin,
    FiTag,
    FiShield,
    FiPhone,
    FiImage,
    FiFlag,
    FiX,
    FiStar,
} from "react-icons/fi";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [contacting, setContacting] = useState(false);

    // Report
    const [showReport, setShowReport] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reporting, setReporting] = useState(false);

    // Rating
    const [showRating, setShowRating] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratingSubmitting, setRatingSubmitting] = useState(false);

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.seller?._id) {
            fetchSellerRating(product.seller._id);
        }
    }, [product]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );

            setProduct(res.data.product);
        } catch (error) {
            console.error(error);
        }
    };

    /* =========================
       GET SELLER RATING
    ========================= */

    const fetchSellerRating = async (sellerId) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/ratings/seller/${sellerId}`
            );

            setRating(res.data.averageRating || 0);
        } catch (error) {
            console.error(error);
        }
    };

    /* =========================
       CONTACT SELLER
    ========================= */

    const handleContactSeller = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (
            product.seller?._id === user?.id ||
            product.seller === user?.id
        ) {
            alert("You cannot contact yourself.");
            return;
        }

        try {
            setContacting(true);

            const res = await axios.post(
                "http://localhost:5000/api/chat/conversations",
                {
                    productId: product._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate(`/chat/${res.data.conversation._id}`);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to start chat."
            );
        } finally {
            setContacting(false);
        }
    };

    /* =========================
       REPORT PRODUCT
    ========================= */

    const handleReport = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (!reportReason) {
            alert("Please select a reason.");
            return;
        }

        try {
            setReporting(true);

            await axios.post(
                "http://localhost:5000/api/reports",
                {
                    productId: product._id,
                    reason: reportReason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product reported successfully.");

            setShowReport(false);
            setReportReason("");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to report product."
            );
        } finally {
            setReporting(false);
        }
    };

    /* =========================
       RATE SELLER
    ========================= */

    const handleRatingSubmit = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (!selectedRating) {
            alert("Please select a rating.");
            return;
        }

        try {
            setRatingSubmitting(true);

            await axios.post(
                "http://localhost:5000/api/ratings",
                {
                    productId: product._id,
                    rating: selectedRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Seller rated successfully!");

            setShowRating(false);
            setRating(selectedRating);
            setSelectedRating(0);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to submit rating."
            );
        } finally {
            setRatingSubmitting(false);
        }
    };

    if (!product) {
        return (
            <>
                <Navbar />

                <div className="product-loading">
                    <h2>Loading...</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="product-details">

                {/* =========================
                    IMAGE
                ========================= */}

                <div className="details-image">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    ) : (
                        <div className="image-placeholder">
                            <FiImage size={60} />
                            <span>No Image Available</span>
                        </div>
                    )}
                </div>

                {/* =========================
                    INFO
                ========================= */}

                <div className="details-info">

                    <h1>{product.name}</h1>

                    <div className="price">
                        ₹ {Number(product.price).toLocaleString()}
                    </div>

                    {/* PRODUCT INFO */}

                    <div className="info-grid">

                        <div className="info-card">
                            <FiTag />

                            <div>
                                <small>Category</small>
                                <p>{product.category}</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <FiShield />

                            <div>
                                <small>Condition</small>
                                <p>{product.condition}</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <FiMapPin />

                            <div>
                                <small>Location</small>
                                <p>{product.location}</p>
                            </div>
                        </div>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="description">
                        <h3>Description</h3>

                        <p>{product.description}</p>
                    </div>

                    {/* SELLER */}

                    <div className="seller-box">

                        <div>
                            <small>Seller Contact</small>

                            <h4>
                                {product.contactNumber}
                            </h4>
                        </div>

                        <button
                            className="contact-button"
                            onClick={handleContactSeller}
                            disabled={contacting}
                        >
                            <FiPhone />

                            {contacting
                                ? "Opening Chat..."
                                : "Contact Seller"}
                        </button>

                    </div>

                    {/* SELLER RATING */}

                    <div className="seller-rating-section">

                        <div className="seller-rating-info">

                            <div>
                                <small>Seller Rating</small>

                                <div className="rating-display">

                                    <span className="rating-number">
                                        {rating
                                            ? rating.toFixed(1)
                                            : "No ratings"}
                                    </span>

                                    {rating > 0 && (
                                        <div className="rating-stars-display">
                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (
                                                    <FiStar
                                                        key={star}
                                                        className={
                                                            star <=
                                                            Math.round(rating)
                                                                ? "star-filled"
                                                                : "star-empty"
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                </div>
                            </div>

                            <button
                                className="rate-seller-button"
                                onClick={() =>
                                    setShowRating(true)
                                }
                            >
                                <FiStar />
                                Rate Seller
                            </button>

                        </div>

                    </div>

                    {/* REPORT */}

                    <button
                        className="report-product-button"
                        onClick={() => setShowReport(true)}
                    >
                        <FiFlag />
                        Report Product
                    </button>

                </div>

                {/* =========================
                    RATING MODAL
                ========================= */}

                {showRating && (
                    <div
                        className="report-overlay"
                        onClick={() =>
                            setShowRating(false)
                        }
                    >
                        <div
                            className="rating-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="report-close"
                                onClick={() =>
                                    setShowRating(false)
                                }
                            >
                                <FiX />
                            </button>

                            <h2>Rate Seller</h2>

                            <p>
                                How would you rate this seller?
                            </p>

                            <div className="rating-stars-input">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setSelectedRating(star)
                                            }
                                        >
                                            <FiStar
                                                className={
                                                    star <= selectedRating
                                                        ? "star-selected"
                                                        : "star-unselected"
                                                }
                                            />
                                        </button>
                                    )
                                )}

                            </div>

                            <p className="rating-label">
                                {selectedRating === 1 && "Poor"}
                                {selectedRating === 2 && "Fair"}
                                {selectedRating === 3 && "Good"}
                                {selectedRating === 4 && "Very Good"}
                                {selectedRating === 5 && "Excellent"}
                            </p>

                            <button
                                className="submit-rating-button"
                                onClick={handleRatingSubmit}
                                disabled={
                                    ratingSubmitting ||
                                    !selectedRating
                                }
                            >
                                {ratingSubmitting
                                    ? "Submitting..."
                                    : "Submit Rating"}
                            </button>

                        </div>
                    </div>
                )}

                {/* =========================
                    REPORT MODAL
                ========================= */}

                {showReport && (
                    <div
                        className="report-overlay"
                        onClick={() =>
                            setShowReport(false)
                        }
                    >
                        <div
                            className="report-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="report-close"
                                onClick={() =>
                                    setShowReport(false)
                                }
                            >
                                <FiX />
                            </button>

                            <h2>Report Product</h2>

                            <p>
                                Why are you reporting this product?
                            </p>

                            <select
                                value={reportReason}
                                onChange={(e) =>
                                    setReportReason(e.target.value)
                                }
                            >
                                <option value="">
                                    Select a reason
                                </option>

                                <option value="Fraud or scam">
                                    Fraud or scam
                                </option>

                                <option value="Inappropriate content">
                                    Inappropriate content
                                </option>

                                <option value="Fake product">
                                    Fake product
                                </option>

                                <option value="Wrong information">
                                    Wrong information
                                </option>

                                <option value="Prohibited item">
                                    Prohibited item
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>

                            <button
                                className="submit-report-button"
                                onClick={handleReport}
                                disabled={
                                    reporting ||
                                    !reportReason
                                }
                            >
                                {reporting
                                    ? "Submitting..."
                                    : "Submit Report"}
                            </button>

                        </div>
                    </div>
                )}

            </main>
        </>
    );
};

export default ProductDetails;