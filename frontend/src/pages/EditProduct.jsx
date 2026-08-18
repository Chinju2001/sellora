import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AddProduct.css";

import {
    FiBox,
    FiImage,
    FiDollarSign,
    FiMapPin,
    FiPhone,
    FiFileText,
    FiSave
} from "react-icons/fi";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        condition: "New",
        location: "Kochi",
        contactNumber: "",
        image: "",
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );

            setFormData(res.data.product);

        } catch (error) {

            console.log(error);

        }
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

            await axios.put(

                `http://localhost:5000/api/products/${id}`,

                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            alert("Product updated successfully.");

            navigate("/my-listings");

        } catch (error) {

            console.log(error);

            alert("Update failed.");

        }
    };

    return (
        <>
            <Navbar />

            <div className="add-product-container">

                <div className="page-header">

                    <span className="page-badge">
                        UPDATE PRODUCT
                    </span>

                    <h1>Edit Your Listing</h1>

                    <p>
                        Keep your product information up to date.
                    </p>

                </div>

                <div className="form-card">

                    <form
                        className="add-product-form"
                        onSubmit={handleSubmit}
                    >

                        <label>
                            <FiBox />
                            Product Name
                        </label>

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <label>
                            <FiImage />
                            Category
                        </label>

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

                        <label>
                            Condition
                        </label>

                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                        >
                            <option>New</option>
                            <option>Used</option>
                        </select>

                        <label>
                            <FiDollarSign />
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <label>
                            <FiMapPin />
                            Location
                        </label>

                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        <label>
                            <FiFileText />
                            Description
                        </label>

                        <textarea
                            rows="6"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label>
                            <FiPhone />
                            Contact Number
                        </label>

                        <input
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="post-button"
                        >
                            <FiSave />

                            Update Product
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
};

export default EditProduct;