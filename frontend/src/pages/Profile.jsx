import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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

            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    return (
        <>
            <Navbar />

            <div className="profile-container">
                <div className="profile-card">
                    <div className="avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <h2>{user.name}</h2>

                    <p>{user.email}</p>

                    <div className="profile-info">
                        <label>Name</label>
                        <input value={user.name} disabled />

                        <label>Email</label>
                        <input value={user.email} disabled />
                    </div>

                    <button
                        className="edit-profile-btn"
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;