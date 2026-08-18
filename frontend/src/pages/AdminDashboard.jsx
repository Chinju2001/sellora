import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    FiUsers,
    FiPackage,
    FiFlag,
    FiTrash2,
    FiShield,
} from "react-icons/fi";

import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        reports: 0,
    });

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [reports, setReports] = useState([]);

    const [activeTab, setActiveTab] =
        useState("overview");

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const statsRes = await axios.get(
                "http://localhost:5000/api/admin/stats",
                { headers }
            );

            setStats(statsRes.data.stats);

        } catch (error) {
            console.error(error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/");
            }
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/users",
                { headers }
            );

            setUsers(res.data.users);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/listings",
                { headers }
            );

            setProducts(res.data.products);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/reports",
                { headers }
            );

            setReports(res.data.reports);

        } catch (error) {
            console.error(error);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === "users") {
            fetchUsers();
        }

        if (tab === "listings") {
            fetchProducts();
        }

        if (tab === "reports") {
            fetchReports();
        }
    };

    const deleteUser = async (id) => {
        if (
            !window.confirm(
                "Delete this user and all their listings?"
            )
        ) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/users/${id}`,
                { headers }
            );

            setUsers((prev) =>
                prev.filter(
                    (user) => user._id !== id
                )
            );

            fetchDashboard();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    const deleteProduct = async (id) => {
        if (
            !window.confirm(
                "Remove this listing?"
            )
        ) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/listings/${id}`,
                { headers }
            );

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        product._id !== id
                )
            );

            fetchDashboard();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to remove listing."
            );
        }
    };

    const updateReport = async (
        reportId,
        status
    ) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/reports/${reportId}`,
                { status },
                { headers }
            );

            fetchReports();
            fetchDashboard();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update report."
            );
        }
    };

    return (
        <div className="admin-page">

            {/* HEADER */}

            <header className="admin-header">

                <div>
                    <div className="admin-title">

                        <div className="admin-icon">
                            <FiShield />
                        </div>

                        <div>
                            <h1>
                                Admin Dashboard
                            </h1>

                            <p>
                                Manage Sellora
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    className="admin-home-btn"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Back to Sellora
                </button>

            </header>


            <main className="admin-content">

                {/* NAVIGATION */}

                <div className="admin-tabs">

                    <button
                        className={
                            activeTab ===
                            "overview"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "overview"
                            )
                        }
                    >
                        Overview
                    </button>

                    <button
                        className={
                            activeTab ===
                            "users"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "users"
                            )
                        }
                    >
                        Users
                    </button>

                    <button
                        className={
                            activeTab ===
                            "listings"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "listings"
                            )
                        }
                    >
                        Listings
                    </button>

                    <button
                        className={
                            activeTab ===
                            "reports"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "reports"
                            )
                        }
                    >
                        Reports
                    </button>

                </div>


                {/* OVERVIEW */}

                {activeTab === "overview" && (

                    <div>

                        <div className="admin-cards">

                            <div className="admin-card">

                                <FiUsers />

                                <div>
                                    <span>
                                        Total Users
                                    </span>

                                    <strong>
                                        {stats.users}
                                    </strong>
                                </div>

                            </div>


                            <div className="admin-card">

                                <FiPackage />

                                <div>
                                    <span>
                                        Total Listings
                                    </span>

                                    <strong>
                                        {stats.products}
                                    </strong>
                                </div>

                            </div>


                            <div className="admin-card">

                                <FiFlag />

                                <div>
                                    <span>
                                        Pending Reports
                                    </span>

                                    <strong>
                                        {stats.reports}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        <div className="admin-welcome">

                            <h2>
                                Welcome to Sellora Admin
                            </h2>

                            <p>
                                Use the sections above
                                to manage users,
                                monitor listings and
                                review reported
                                products.
                            </p>

                        </div>

                    </div>
                )}


                {/* USERS */}

                {activeTab === "users" && (

                    <section className="admin-section">

                        <h2>
                            Manage Users
                        </h2>

                        <div className="admin-table-wrapper">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Joined</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {users.map(
                                        (user) => (

                                            <tr
                                                key={
                                                    user._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        user.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>

                                                    {user.isAdmin ? (

                                                        <span className="admin-label">
                                                            Admin
                                                        </span>

                                                    ) : (

                                                        <button
                                                            className="danger-button"
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <FiTrash2 />
                                                            Delete
                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>
                )}


                {/* LISTINGS */}

                {activeTab ===
                    "listings" && (

                    <section className="admin-section">

                        <h2>
                            Monitor Listings
                        </h2>

                        <div className="admin-products">

                            {products.map(
                                (product) => (

                                    <div
                                        className="admin-product"
                                        key={
                                            product._id
                                        }
                                    >

                                        <div className="admin-product-image">

                                            {product.image ? (

                                                <img
                                                    src={
                                                        product.image
                                                    }
                                                    alt={
                                                        product.name
                                                    }
                                                />

                                            ) : (

                                                <FiPackage />

                                            )}

                                        </div>


                                        <div className="admin-product-info">

                                            <h3>
                                                {
                                                    product.name
                                                }
                                            </h3>

                                            <strong>
                                                ₹{" "}
                                                {Number(
                                                    product.price
                                                ).toLocaleString()}
                                            </strong>

                                            <p>
                                                Seller:{" "}
                                                {
                                                    product
                                                        .seller
                                                        ?.name
                                                }
                                            </p>

                                            <p>
                                                {
                                                    product.location
                                                }
                                            </p>

                                        </div>


                                        <button
                                            className="danger-button"
                                            onClick={() =>
                                                deleteProduct(
                                                    product._id
                                                )
                                            }
                                        >
                                            <FiTrash2 />
                                            Remove
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    </section>
                )}


                {/* REPORTS */}

                {activeTab === "reports" && (

                    <section className="admin-section">

                        <h2>
                            Reported Products
                        </h2>

                        <div className="reports-list">

                            {reports.length ===
                            0 ? (

                                <div className="no-reports">
                                    <FiFlag />

                                    <p>
                                        No reports found.
                                    </p>
                                </div>

                            ) : (

                                reports.map(
                                    (report) => (

                                        <div
                                            className="report-card"
                                            key={
                                                report._id
                                            }
                                        >

                                            <div>

                                                <h3>
                                                    {
                                                        report
                                                            .product
                                                            ?.name
                                                    }
                                                </h3>

                                                <p>
                                                    Reason:{" "}
                                                    {
                                                        report.reason
                                                    }
                                                </p>

                                                <p>
                                                    Reported by:{" "}
                                                    {
                                                        report
                                                            .reportedBy
                                                            ?.name
                                                    }
                                                </p>

                                                <span
                                                    className={`report-status ${report.status.toLowerCase()}`}
                                                >
                                                    {
                                                        report.status
                                                    }
                                                </span>

                                            </div>


                                            <div className="report-actions">

                                                {report.status ===
                                                    "Pending" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                updateReport(
                                                                    report._id,
                                                                    "Reviewed"
                                                                )
                                                            }
                                                        >
                                                            Mark Reviewed
                                                        </button>

                                                        <button
                                                            className="danger-button"
                                                            onClick={() => {
                                                                if (
                                                                    report.product?._id
                                                                ) {
                                                                    deleteProduct(
                                                                        report
                                                                            .product
                                                                            ._id
                                                                    );
                                                                }

                                                                updateReport(
                                                                    report._id,
                                                                    "Resolved"
                                                                );
                                                            }}
                                                        >
                                                            Remove Product
                                                        </button>
                                                    </>
                                                )}

                                            </div>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </section>
                )}

            </main>

        </div>
    );
};

export default AdminDashboard;