import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Settings.css";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <>
            <Navbar />

            <div className="settings-container">

                <div className="settings-card">

                    <div className="settings-header">
                        <span className="settings-badge">
                            PREFERENCES
                        </span>

                        <h1>Settings</h1>

                        <p>
                            Customize your Sellora experience.
                        </p>
                    </div>


                    {/* ================= APPEARANCE ================= */}

                    <div className="setting-section">

                        <h3>Appearance</h3>

                        <div className="setting-item">

                            <div>
                                <strong>Theme</strong>

                                <p>
                                    Choose how Sellora looks on your device.
                                </p>
                            </div>

                            <button
                                className={`theme-toggle ${
                                    darkMode ? "active" : ""
                                }`}
                                onClick={() =>
                                    setDarkMode(!darkMode)
                                }
                                aria-label="Toggle dark mode"
                            >
                                <span className="toggle-circle">
                                    {darkMode ? "🌙" : "☀️"}
                                </span>

                                <span className="toggle-text">
                                    {darkMode ? "Dark" : "Light"}
                                </span>
                            </button>

                        </div>

                    </div>


                    {/* ================= LANGUAGE ================= */}

                    <div className="setting-section">

                        <h3>Language</h3>

                        <div className="setting-item">

                            <div>
                                <strong>Language</strong>

                                <p>
                                    Select your preferred language.
                                </p>
                            </div>

                            <span className="setting-value">
                                English
                            </span>

                        </div>

                    </div>


                    {/* ================= NOTIFICATIONS ================= */}

                    <div className="setting-section">

                        <h3>Notifications</h3>

                        <div className="setting-item">

                            <div>
                                <strong>Email Notifications</strong>

                                <p>
                                    Receive updates and important
                                    notifications by email.
                                </p>
                            </div>

                            <span className="coming-soon">
                                Coming Soon
                            </span>

                        </div>

                    </div>


                    {/* ================= ACCOUNT ================= */}

                    <div className="setting-section">

                        <h3>Account</h3>

                        <div className="setting-item">

                            <div>
                                <strong>Change Password</strong>

                                <p>
                                    Update your account password.
                                </p>
                            </div>

                            <span className="coming-soon">
                                Coming Soon
                            </span>

                        </div>


                        <div className="setting-item">

                            <div>
                                <strong>Delete Account</strong>

                                <p>
                                    Permanently remove your Sellora account.
                                </p>
                            </div>

                            <span className="coming-soon danger">
                                Coming Soon
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Settings;