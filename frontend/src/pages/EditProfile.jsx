import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FiUser,
    FiMail,
    FiSave
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import "./EditProfile.css";

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
                `${import.meta.env.VITE_API_URL}/api/users/profile`,
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
                `${import.meta.env.VITE_API_URL}/api/users/profile`,
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

                    <div className="profile-header">

                        <div className="profile-avatar">
                            {formData.name
                                ? formData.name.charAt(0).toUpperCase()
                                : "U"}
                        </div>

                        <h1>Edit Profile</h1>

                        <p>Keep your profile information up to date.</p>

                    </div>

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <label className="form-label">
                            <FiUser />
                            Name
                        </label>

                        <input
                            className="profile-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label className="form-label">
                            <FiMail />
                            Email
                        </label>

                        <input
                            className="profile-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="edit-profile-btn"
                        >
                            <FiSave />
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
};

export default EditProfile;