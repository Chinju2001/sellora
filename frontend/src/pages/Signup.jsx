import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
            localStorage.setItem("user", JSON.stringify(res.data.user));

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

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                />

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
                    Signup
                </button>

                <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </form>

        </div>
    );
};

export default Signup;