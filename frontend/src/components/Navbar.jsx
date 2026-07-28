import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const handler = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <h2>LocoMarket</h2>
                </Link>
            </div>

            <div className="navbar-right">
                <SearchBar />

                <select>
                    <option>Select your city</option>
                    <option>Thrissur</option>
                    <option>Kochi</option>
                    <option>Trivandrum</option>
                    <option>Kozhikode</option>
                    <option>Alappuzha</option>
                    <option>Kottayam</option>
                    <option>Palakkad</option>
                </select>

                {token ? (
                    <>
                        <button
                            onClick={() => navigate("/add-product")}
                        >
                            + Sell
                        </button>

                        <div
                            className="profile-menu"
                            ref={menuRef}
                        >
                            <button
                                onClick={() =>
                                    setShowMenu(!showMenu)
                                }
                            >
                                👤 {user?.name} ▼
                            </button>

                            {showMenu && (
                                <div className="dropdown-menu">
                                    <button
                                        onClick={() =>
                                            navigate("/profile")
                                        }
                                    >
                                        My Profile
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/my-listings"
                                            )
                                        }
                                    >
                                        My Listings
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate("/settings")
                                        }
                                    >
                                        Settings
                                    </button>

                                    <button
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Login
                        </button>

                        <button
                            onClick={() =>
                                navigate("/signup")
                            }
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;