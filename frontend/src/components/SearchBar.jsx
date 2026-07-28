import React from "react";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useSearch();

    return (
        <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default SearchBar;