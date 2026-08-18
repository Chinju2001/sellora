import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
    FiMail,
    FiLock,
    FiArrowRight
} from "react-icons/fi";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Login failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <span className="auth-badge">
                    Welcome Back
                </span>

                <h1>Login to Sellora</h1>

                <p>
                    Continue buying and selling products near you.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Login

                        <FiArrowRight />

                    </button>

                </form>

                <p className="bottom-text">

                    Don't have an account?

                    <Link to="/signup">
                        Create one
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;