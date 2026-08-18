import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiUploadCloud,
    FiImage,
    FiBox,
    FiMapPin,
    FiPhone,
    FiDollarSign,
    FiFileText,
    FiCheckCircle
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import "./AddProduct.css";
import axios from "axios";


const AddProduct = () => {

    const navigate = useNavigate();

    const [condition, setCondition] = useState("New");

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: "Electronics",
        price: "",
        location: "Kochi",
        description: "",
        contactNumber: "",
    });


    /* =========================
       CHECK LOGIN
    ========================= */

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert("Please login first.");

            navigate("/login");
        }

    }, [navigate]);


    /* =========================
       IMAGE CHANGE
    ========================= */

    const handleImageChange = (event) => {

        const file =
            event.target.files[0];

        if (!file) return;


        /* Check file type */

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;
        }


        /* Check file size */

        if (file.size > 5 * 1024 * 1024) {

            alert("Image must be smaller than 5MB.");

            return;
        }


        setImage(file);

        setImagePreview(
            URL.createObjectURL(file)
        );
    };


    /* =========================
       REMOVE IMAGE
    ========================= */

    const handleRemoveImage = () => {

        setImage(null);

        setImagePreview(null);
    };


    /* =========================
       FORM CHANGE
    ========================= */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    /* =========================
       SUBMIT
    ========================= */

    const handleSubmit = async (e) => {

        e.preventDefault();


        const token =
            localStorage.getItem("token");


        if (!token) {

            alert("Please login first.");

            navigate("/login");

            return;
        }


        if (!formData.name.trim()) {

            alert("Please enter a product name.");

            return;
        }


        if (!formData.price) {

            alert("Please enter a price.");

            return;
        }


        if (!formData.description.trim()) {

            alert("Please enter a description.");

            return;
        }


        if (!formData.contactNumber.trim()) {

            alert("Please enter a contact number.");

            return;
        }


        try {

            setLoading(true);


            /* =========================
               CREATE FORM DATA
            ========================= */

            const data =
                new FormData();


            data.append(
                "name",
                formData.name
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "location",
                formData.location
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "contactNumber",
                formData.contactNumber
            );

            data.append(
                "condition",
                condition
            );


            /* Add image */

            if (image) {

                data.append(
                    "image",
                    image
                );
            }


            /* =========================
               SEND TO BACKEND
            ========================= */

            await axios.post(
                "http://localhost:5000/api/products",
                data,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            alert(
                "Product added successfully!"
            );


            navigate("/");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />

            <div className="add-product-container">

                <div className="page-header">

                    <span className="page-badge">
                        SELL ON SELLORA
                    </span>

                    <h2>
                        Create Your Listing
                    </h2>

                    <p>
                        Reach thousands of nearby buyers by creating
                        your listing in just a few minutes.
                    </p>

                </div>


                <div className="form-card">

                    <form
                        className="add-product-form"
                        onSubmit={handleSubmit}
                    >

                        {/* =========================
                            IMAGE UPLOAD
                        ========================= */}

                        <label
                            htmlFor="product-image"
                            className="image-upload"
                        >

                            <div className="image-preview">

                                {imagePreview && (

                                    <button
                                        type="button"
                                        className="remove-image-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveImage();
                                        }}
                                    >
                                        ×
                                    </button>

                                )}


                                {imagePreview ? (

                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="preview-image"
                                    />

                                ) : (

                                    <div className="upload-placeholder">

                                        <FiUploadCloud
                                            className="upload-icon"
                                        />

                                        <h3>
                                            Upload Images
                                        </h3>

                                        <p>
                                            Click to upload your product photo
                                        </p>

                                        <small>
                                            JPG • PNG • Max 5MB
                                        </small>

                                    </div>

                                )}

                            </div>


                            <div className="image-info">

                                <h3>
                                    Product Images
                                </h3>

                                <ul>

                                    <li>
                                        <FiCheckCircle />
                                        Use clear, bright photos.
                                    </li>

                                    <li>
                                        <FiCheckCircle />
                                        Show the product from multiple angles.
                                    </li>

                                    <li>
                                        <FiCheckCircle />
                                        First image becomes the cover photo.
                                    </li>

                                    <li>
                                        <FiCheckCircle />
                                        Supported: JPG & PNG (Max 5MB)
                                    </li>

                                </ul>

                            </div>

                        </label>


                        <input
                            type="file"
                            id="product-image"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />


                        {/* =========================
                            PRODUCT NAME
                        ========================= */}

                        <label>

                            <FiBox />

                            Product Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Example: iPhone 13 128GB Blue"
                            value={formData.name}
                            onChange={handleChange}
                        />


                        {/* =========================
                            CATEGORY
                        ========================= */}

                        <label>

                            <FiImage />

                            Category

                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >

                            <option>
                                Electronics
                            </option>

                            <option>
                                Mobiles
                            </option>

                            <option>
                                Vehicles
                            </option>

                            <option>
                                Furniture
                            </option>

                            <option>
                                Fashion
                            </option>

                            <option>
                                Books
                            </option>

                            <option>
                                Home Appliances
                            </option>

                            <option>
                                Others
                            </option>

                        </select>


                        {/* =========================
                            CONDITION
                        ========================= */}

                        <label>
                            Condition
                        </label>

                        <div className="condition-buttons">

                            <button
                                type="button"
                                className={
                                    condition === "New"
                                        ? "condition-btn active"
                                        : "condition-btn"
                                }
                                onClick={() =>
                                    setCondition("New")
                                }
                            >
                                New
                            </button>


                            <button
                                type="button"
                                className={
                                    condition === "Used"
                                        ? "condition-btn active"
                                        : "condition-btn"
                                }
                                onClick={() =>
                                    setCondition("Used")
                                }
                            >
                                Used
                            </button>

                        </div>


                        {/* =========================
                            PRICE
                        ========================= */}

                        <label>

                            <FiDollarSign />

                            Price

                        </label>

                        <input
                            type="number"
                            name="price"
                            placeholder="Enter expected price"
                            value={formData.price}
                            onChange={handleChange}
                        />


                        {/* =========================
                            LOCATION
                        ========================= */}

                        <label>

                            <FiMapPin />

                            Location

                        </label>

                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        >

                            <option>
                                Kochi
                            </option>

                            <option>
                                Thrissur
                            </option>

                            <option>
                                Trivandrum
                            </option>

                            <option>
                                Kozhikode
                            </option>

                        </select>


                        {/* =========================
                            DESCRIPTION
                        ========================= */}

                        <label>

                            <FiFileText />

                            Description

                        </label>

                        <textarea
                            rows="6"
                            name="description"
                            placeholder="Describe your product, condition, age, warranty, accessories included..."
                            value={formData.description}
                            onChange={handleChange}
                        />


                        {/* =========================
                            CONTACT
                        ========================= */}

                        <label>

                            <FiPhone />

                            Contact Number

                        </label>

                        <input
                            type="tel"
                            name="contactNumber"
                            placeholder="Enter your phone number"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />


                        {/* =========================
                            SUBMIT
                        ========================= */}

                        <button
                            type="submit"
                            className="post-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Uploading..."
                                : "Post Your Product"}

                        </button>


                        <p className="form-note">
                            By publishing this listing, you agree to Sellora's community guidelines.
                        </p>

                    </form>

                </div>

            </div>
        </>
    );
};

export default AddProduct;