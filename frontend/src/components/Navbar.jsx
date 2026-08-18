import React, { useState, useEffect, useRef } from "react";
import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import SearchBar from "./SearchBar";
import "./Navbar.css";

import {
    FiMapPin,
    FiChevronDown,
    FiUser,
    FiSettings,
    FiLogOut,
    FiPackage,
    FiMenu,
    FiX,
    FiMessageCircle,
    FiHeart,
    FiShield,
} from "react-icons/fi";


const Navbar = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] =
        useSearchParams();

    const [showMenu, setShowMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const menuRef = useRef(null);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem("token");


    /* =========================
       CLOSE DROPDOWN
    ========================= */

    useEffect(() => {
        const handler = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handler
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handler
            );
        };
    }, []);


    /* =========================
       LOCATION
    ========================= */

    const handleLocationChange = (e) => {
        const value = e.target.value;

        const params = new URLSearchParams(
            searchParams
        );

        if (value) {
            params.set("location", value);
        } else {
            params.delete("location");
        }

        setSearchParams(params);
    };

    const selectedLocation =
        searchParams.get("location") || "";


    /* =========================
       LOGOUT
    ========================= */

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setShowMenu(false);
        setMobileMenuOpen(false);

        navigate("/login");
    };


    /* =========================
       MOBILE MENU
    ========================= */

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };


    return (
        <>
            <header className="navbar">

                {/* =========================
                    LOGO
                ========================= */}

                <div className="navbar-left">

                    <Link
                        to="/"
                        className="logo"
                    >

                        <div className="sellora-logo-mark">
                            S
                        </div>

                        <div className="logo-text">

                            <h2>Sellora</h2>

                            <span>
                                Buy. Sell. Discover.
                            </span>

                        </div>

                    </Link>

                </div>


                {/* =========================
                    MOBILE MENU BUTTON
                ========================= */}

                <button
                    className="menu-toggle"
                    onClick={() =>
                        setMobileMenuOpen(
                            !mobileMenuOpen
                        )
                    }
                    aria-label="Toggle navigation menu"
                >

                    {mobileMenuOpen ? (
                        <FiX />
                    ) : (
                        <FiMenu />
                    )}

                </button>


                {/* =========================
                    DESKTOP NAVBAR
                ========================= */}

                <div className="navbar-right">

                    <SearchBar />


                    {/* LOCATION */}

                    <div className="location-box">

                        <FiMapPin />

                        <select
                            value={selectedLocation}
                            onChange={
                                handleLocationChange
                            }
                        >

                            <option value="">
                                Select your city
                            </option>

                            <option value="Kochi">
                                Kochi
                            </option>

                            <option value="Thrissur">
                                Thrissur
                            </option>

                            <option value="Trivandrum">
                                Trivandrum
                            </option>

                            <option value="Kozhikode">
                                Kozhikode
                            </option>

                            <option value="Alappuzha">
                                Alappuzha
                            </option>

                            <option value="Kottayam">
                                Kottayam
                            </option>

                            <option value="Palakkad">
                                Palakkad
                            </option>

                        </select>

                        <FiChevronDown
                            className="location-arrow"
                        />

                    </div>


                    {/* =========================
                        AUTHENTICATED USER
                    ========================= */}

                    {token ? (

                        <>

                            {/* SELL */}

                            <button
                                className="sell-btn"
                                onClick={() =>
                                    navigate(
                                        "/add-product"
                                    )
                                }
                            >
                                + Sell
                            </button>


                            {/* PROFILE */}

                            <div
                                className="profile-menu"
                                ref={menuRef}
                            >

                                <button
                                    className="profile-btn"
                                    onClick={() =>
                                        setShowMenu(
                                            !showMenu
                                        )
                                    }
                                >

                                    <div className="navbar-avatar">

                                        {user?.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>

                                    <span className="profile-name">

                                        {user?.name?.split(
                                            " "
                                        )[0]}

                                    </span>

                                    <FiChevronDown />

                                </button>


                                {/* =========================
                                    PROFILE DROPDOWN
                                ========================= */}

                                {showMenu && (

                                    <div className="dropdown-menu">

                                        {/* PROFILE */}

                                        <button
                                            onClick={() => {
                                                navigate(
                                                    "/profile"
                                                );
                                                setShowMenu(
                                                    false
                                                );
                                            }}
                                        >
                                            <FiUser />
                                            My Profile
                                        </button>


                                        {/* WISHLIST */}

                                        <button
                                            onClick={() => {
                                                navigate(
                                                    "/wishlist"
                                                );
                                                setShowMenu(
                                                    false
                                                );
                                            }}
                                        >
                                            <FiHeart />
                                            My Wishlist
                                        </button>


                                        {/* MY LISTINGS */}

                                        <button
                                            onClick={() => {
                                                navigate(
                                                    "/my-listings"
                                                );
                                                setShowMenu(
                                                    false
                                                );
                                            }}
                                        >
                                            <FiPackage />
                                            My Listings
                                        </button>


                                        {/* MY CHATS */}

                                        <button
                                            onClick={() => {
                                                navigate(
                                                    "/my-chats"
                                                );
                                                setShowMenu(
                                                    false
                                                );
                                            }}
                                        >
                                            <FiMessageCircle />
                                            My Chats
                                        </button>


                                        {/* =========================
                                            ADMIN DASHBOARD
                                            ONLY FOR ADMINS
                                        ========================= */}

                                        {user?.isAdmin && (

                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        "/admin"
                                                    );
                                                    setShowMenu(
                                                        false
                                                    );
                                                }}
                                            >
                                                <FiShield />
                                                Admin Dashboard
                                            </button>

                                        )}


                                        {/* SETTINGS */}

                                        <button
                                            onClick={() => {
                                                navigate(
                                                    "/settings"
                                                );
                                                setShowMenu(
                                                    false
                                                );
                                            }}
                                        >
                                            <FiSettings />
                                            Settings
                                        </button>


                                        {/* LOGOUT */}

                                        <button
                                            onClick={logout}
                                        >
                                            <FiLogOut />
                                            Logout
                                        </button>

                                    </div>

                                )}

                            </div>

                        </>

                    ) : (

                        /* =========================
                           LOGGED OUT
                        ========================= */

                        <>

                            <button
                                className="login-btn"
                                onClick={() =>
                                    navigate(
                                        "/login"
                                    )
                                }
                            >
                                Login
                            </button>

                            <button
                                className="signup-btn"
                                onClick={() =>
                                    navigate(
                                        "/signup"
                                    )
                                }
                            >
                                Signup
                            </button>

                        </>

                    )}

                </div>

            </header>


            {/* =========================
                MOBILE MENU
            ========================= */}

            {mobileMenuOpen && (

                <div className="mobile-menu">

                    <SearchBar />


                    {/* MOBILE LOCATION */}

                    <div className="mobile-location">

                        <FiMapPin />

                        <select
                            value={selectedLocation}
                            onChange={
                                handleLocationChange
                            }
                        >

                            <option value="">
                                Select your city
                            </option>

                            <option value="Kochi">
                                Kochi
                            </option>

                            <option value="Thrissur">
                                Thrissur
                            </option>

                            <option value="Trivandrum">
                                Trivandrum
                            </option>

                            <option value="Kozhikode">
                                Kozhikode
                            </option>

                            <option value="Alappuzha">
                                Alappuzha
                            </option>

                            <option value="Kottayam">
                                Kottayam
                            </option>

                            <option value="Palakkad">
                                Palakkad
                            </option>

                        </select>

                    </div>


                    {token ? (

                        <>

                            {/* SELL */}

                            <button
                                className="sell-btn mobile-btn"
                                onClick={() => {
                                    navigate(
                                        "/add-product"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                + Sell Product
                            </button>


                            {/* PROFILE */}

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/profile"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                <FiUser />
                                My Profile
                            </button>


                            {/* WISHLIST */}

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/wishlist"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                <FiHeart />
                                My Wishlist
                            </button>


                            {/* MY LISTINGS */}

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/my-listings"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                <FiPackage />
                                My Listings
                            </button>


                            {/* MY CHATS */}

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/my-chats"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                <FiMessageCircle />
                                My Chats
                            </button>


                            {/* =========================
                                ADMIN DASHBOARD
                                MOBILE
                            ========================= */}

                            {user?.isAdmin && (

                                <button
                                    className="mobile-link"
                                    onClick={() => {
                                        navigate(
                                            "/admin"
                                        );

                                        closeMobileMenu();
                                    }}
                                >
                                    <FiShield />
                                    Admin Dashboard
                                </button>

                            )}


                            {/* SETTINGS */}

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/settings"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                <FiSettings />
                                Settings
                            </button>


                            {/* LOGOUT */}

                            <button
                                className="mobile-link logout-mobile"
                                onClick={logout}
                            >
                                <FiLogOut />
                                Logout
                            </button>

                        </>

                    ) : (

                        /* =========================
                           MOBILE LOGGED OUT
                        ========================= */

                        <>

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/login"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="mobile-link"
                                onClick={() => {
                                    navigate(
                                        "/signup"
                                    );

                                    closeMobileMenu();
                                }}
                            >
                                Signup
                            </button>

                        </>

                    )}

                </div>

            )}

        </>
    );
};

export default Navbar;