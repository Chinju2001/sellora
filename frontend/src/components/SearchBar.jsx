import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../context/SearchContext";
import "./Navbar.css";
const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useSearch();

    return (
        <div className="search-box">
            <FiSearch className="search-icon" />

            <input
                className="search-input"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;