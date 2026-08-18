import React from "react";
import {
    FiMonitor,
    FiSmartphone,
    FiTruck,
    FiHome,
    FiShoppingBag,
    FiBook,
    FiCpu,
    FiGrid,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./CategoryList.css";

const categories = [
    { name: "Electronics", icon: <FiMonitor /> },
    { name: "Mobiles", icon: <FiSmartphone /> },
    { name: "Vehicles", icon: <FiTruck /> },
    { name: "Furniture", icon: <FiHome /> },
    { name: "Fashion", icon: <FiShoppingBag /> },
    { name: "Books", icon: <FiBook /> },
    { name: "Home Appliances", icon: <FiCpu /> },
    { name: "Others", icon: <FiGrid /> },
];

const CategoryList = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(
            `/?category=${encodeURIComponent(category)}`
        );
    };

    return (
        <section className="categories-container">
            {categories.map((category) => (
                <button
                    key={category.name}
                    className="category-chip"
                    onClick={() =>
                        handleCategoryClick(category.name)
                    }
                >
                    <span className="category-icon">
                        {category.icon}
                    </span>

                    <span>{category.name}</span>
                </button>
            ))}
        </section>
    );
};

export default CategoryList;