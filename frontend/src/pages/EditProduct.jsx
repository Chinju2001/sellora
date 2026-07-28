import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "New",
        location: "",
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
                <h1>Edit Product</h1>

                <form
                    className="add-product-form"
                    onSubmit={handleSubmit}
                >
                    <label>Product Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>Description</label>
                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <label>Category</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <label>Condition</label>
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                    >
                        <option>New</option>
                        <option>Used</option>
                    </select>

                    <label>Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    <label>Contact Number</label>
                    <input
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />

                    <button type="submit" className="post-button">
                        Update Product
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProduct;