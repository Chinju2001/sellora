import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
    FiUser,
    FiMail,
    FiLock,
    FiArrowRight,
} from "react-icons/fi";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/signup",
                formData
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Signup Successful");

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Signup failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <span className="auth-badge">
                    Join Sellora
                </span>

                <h1>Create Your Account</h1>

                <p>
                    Start buying and selling products with people
                    around you.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        <FiUser />
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        required
                    />

                    <label>
                        <FiMail />
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />

                    <label>
                        <FiLock />
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Create Account

                        <FiArrowRight />

                    </button>

                </form>

                <p className="bottom-text">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Signup;