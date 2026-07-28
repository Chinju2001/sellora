import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import Navbar from "../components/Navbar";
import "./AddProduct.css";
import axios from "axios";

const AddProduct = () => {
    const navigate = useNavigate();

    const [condition, setCondition] = useState("New");
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "Electronics",
        price: "",
        location: "Kochi",
        description: "",
        contactNumber: "",
    });

    // Protect page
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            navigate("/login");
        }
    }, [navigate]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const productData = {
                ...formData,
                condition,
                image: "",
            };

            const res = await axios.post(
                "http://localhost:5000/api/products",
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res.data);

            alert("Product added successfully!");

            navigate("/");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                    "Failed to add product."
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="add-product-container">
                <h1>Add Product</h1>

                <form
                    className="add-product-form"
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="product-image"
                        className="image-upload"
                    >
                        <div className="image-preview">
                            {imagePreview && (
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={handleRemoveImage}
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
                                    <div className="upload-icon">
                                        <FiUploadCloud />
                                    </div>

                                    <p>
                                        Click to upload product
                                        image
                                    </p>

                                    <small>
                                        PNG, JPG • Max 5 MB
                                    </small>
                                </div>
                            )}
                        </div>

                        <div className="image-info">
                            <h3>Upload Product Images</h3>

                            <ul>
                                <li>JPG & PNG supported</li>
                                <li>Maximum size: 5 MB</li>
                                <li>
                                    Use clear, well-lit product
                                    photos
                                </li>
                                <li>
                                    The first image will become the
                                    cover photo
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

                    <label>Product Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option>Electronics</option>
                        <option>Mobiles</option>
                        <option>Vehicles</option>
                        <option>Furniture</option>
                        <option>Fashion</option>
                        <option>Books</option>
                        <option>Home Appliances</option>
                        <option>Others</option>
                    </select>

                    <label>Condition</label>

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

                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <label>Location</label>

                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option>Kochi</option>
                        <option>Thrissur</option>
                        <option>Trivandrum</option>
                        <option>Kozhikode</option>
                    </select>

                    <label>Description</label>

                    <textarea
                        rows="5"
                        name="description"
                        placeholder="Describe your product"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <label>Contact Number</label>

                    <input
                        type="tel"
                        name="contactNumber"
                        placeholder="Enter phone number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="post-button"
                    >
                        Post Product
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;