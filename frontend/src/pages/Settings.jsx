import React from "react";
import Navbar from "../components/Navbar";
import "./Settings.css";

const Settings = () => {
    return (
        <>
            <Navbar />

            <div className="settings-container">
                <div className="settings-card">
                    <h2>Settings</h2>

                    <div className="setting-section">
                        <h3>Appearance</h3>

                        <div className="setting-item">
                            <span>Theme</span>
                            <span className="coming-soon">
                                Light (Dark Mode Coming Soon)
                            </span>
                        </div>
                    </div>

                    <div className="setting-section">
                        <h3>Language</h3>

                        <div className="setting-item">
                            <span>Language</span>
                            <span>English</span>
                        </div>
                    </div>

                    <div className="setting-section">
                        <h3>Notifications</h3>

                        <div className="setting-item">
                            <span>Email Notifications</span>
                            <span className="coming-soon">
                                Coming Soon
                            </span>
                        </div>
                    </div>

                    <div className="setting-section">
                        <h3>Account</h3>

                        <div className="setting-item">
                            <span>Change Password</span>
                            <span className="coming-soon">
                                Coming Soon
                            </span>
                        </div>

                        <div className="setting-item">
                            <span>Delete Account</span>
                            <span className="coming-soon">
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