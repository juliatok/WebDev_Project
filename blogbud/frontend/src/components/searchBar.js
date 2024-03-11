import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../SearchBar.css";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("http://localhost:3001/api/blogs/")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((blog) => {
                    return (
                        value &&
                        blog &&
                        blog.title &&
                        blog.title.toLowerCase().includes(value)
                    );
                });
                setResults(results);
                console.log(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};