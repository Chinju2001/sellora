import React from "react";
import { Link } from "react-router-dom";

import {
    FiShoppingBag,
    FiHome,
    FiPackage,
    FiUser,
    FiSettings,
    FiPlusCircle,
    FiMonitor,
    FiSmartphone,
    FiTruck,
    FiGrid,
} from "react-icons/fi";

import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            {/* ================= TOP SECTION ================= */}

            <div className="footer-container">

                {/* BRAND */}

                <div className="footer-brand">

                    <Link to="/" className="footer-logo">

                        <div className="footer-logo-mark">
                            S
                        </div>

                        <div>
                            <h2>Sellora</h2>
                            <span>Buy. Sell. Discover.</span>
                        </div>

                    </Link>

                    <p>
                        Discover great products, connect with
                        nearby people, and make buying and selling
                        simple.
                    </p>

                </div>


                {/* EXPLORE */}

                <div className="footer-column">

                    <h3>Explore</h3>

                    <Link to="/">
                        <FiHome />
                        Home
                    </Link>

                    <Link to="/">
                        <FiPackage />
                        Browse Products
                    </Link>

                    <Link to="/add-product">
                        <FiPlusCircle />
                        Sell a Product
                    </Link>

                </div>


                {/* ACCOUNT */}

                <div className="footer-column">

                    <h3>Account</h3>

                    <Link to="/profile">
                        <FiUser />
                        My Profile
                    </Link>

                    <Link to="/my-listings">
                        <FiPackage />
                        My Listings
                    </Link>

                    <Link to="/settings">
                        <FiSettings />
                        Settings
                    </Link>

                </div>


                {/* CATEGORIES */}

                <div className="footer-column">

                    <h3>Categories</h3>

                    <Link to="/">
                        <FiMonitor />
                        Electronics
                    </Link>

                    <Link to="/">
                        <FiSmartphone />
                        Mobiles
                    </Link>

                    <Link to="/">
                        <FiTruck />
                        Vehicles
                    </Link>

                    <Link to="/">
                        <FiGrid />
                        More Categories
                    </Link>

                </div>

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="footer-bottom">

                <p>
                    © 2026 Sellora. All rights reserved.
                </p>

                <p>
                    Made for local communities.
                </p>

            </div>

        </footer>
    );
};

export default Footer;