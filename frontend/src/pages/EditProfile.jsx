import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const EditProfile = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFormData(res.data.user);
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

            const res = await axios.put(
                "http://localhost:5000/api/users/profile",
                {
                    name: formData.name,
                    email: formData.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update localStorage so navbar shows the new name
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Profile updated successfully.");

            navigate("/profile");
        } catch (error) {
            console.log(error);
            alert("Failed to update profile.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="profile-container">
                <div className="profile-card">
                    <h2>Edit Profile</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="profile-info">
                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="edit-profile-btn"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;