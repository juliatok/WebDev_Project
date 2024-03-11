import { Outlet, Link } from "react-router-dom";
import '../App.css';
import { SearchBar } from "./searchBar";
import { useState } from "react";
import { SearchResultsList } from "./searchResultList";

const Layout = () => {
    const [results, setResults] = useState([]);

    return (
        <div className="nav-bar">
            <nav>
                <ul>
                <li className="logo">
                    <Link to="/">
                        <img className="web-project-logo" alt="Web project logo" src="./images/web-project-logo-page-1.png" />
                    </Link>
                </li>
                <li>
                    <SearchBar setResults={setResults} />
                    <SearchResultsList results={results} />
                </li>
                <li className="link">
                    <Link to="/mainpage">Home</Link>
                </li>
                <li className="link">
                    <Link to="/categories">Categories</Link>
                </li>
                <li className="link">
                    <Link to="/myprofile">MyProfile</Link>
                </li>
                <li>
                    <div className="text-wrapper-3">STORIES</div>
                </li>
                <li>
                    <img className="ellipse" alt="Ellipse" src="./images/ellipse-1.svg" />
                </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
    }

export default Layout;