import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FiUser,
    FiMail,
    FiEdit2
} from "react-icons/fi";

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

    if (!user) {
        return (
            <>
                <Navbar />
                <h2 style={{ textAlign: "center", marginTop: "80px" }}>
                    Loading...
                </h2>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="profile-container">

                <div className="profile-card">

                    <div className="profile-header">

                        <div className="profile-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <h1>{user.name}</h1>

                        <p>{user.email}</p>

                    </div>

                    <div className="profile-info">

                        <div className="info-card">
                            <FiUser className="info-icon" />

                            <div>
                                <span>Name</span>
                                <h4>{user.name}</h4>
                            </div>
                        </div>

                        <div className="info-card">
                            <FiMail className="info-icon" />

                            <div>
                                <span>Email</span>
                                <h4>{user.email}</h4>
                            </div>
                        </div>

                    </div>

                    <button
                        className="edit-profile-btn"
                        onClick={() => navigate("/edit-profile")}
                    >
                        <FiEdit2 />
                        Edit Profile
                    </button>

                </div>

            </div>
        </>
    );
};

export default Profile;