import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
            localStorage.setItem("user", JSON.stringify(res.data.user));

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
            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </p>

            </form>
        </div>
    );
};

export default Login;