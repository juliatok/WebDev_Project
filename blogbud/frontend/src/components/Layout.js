import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../App.css';
import { SearchBar } from "./searchBar";
import { useState, useEffect } from "react";
import { SearchResultsList } from "./searchResultList";
import { AuthContext } from '../context/authContext';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

const Layout = () => {
    const [results, setResults] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        if (isNavOpen) {
            navRef.current.classList.add('responsive-nav');
        } else {
            navRef.current.classList.remove('responsive-nav');
        }
    }, [isNavOpen]);

    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <div className="nav-bar">
            <nav ref={navRef}>
                <ul>
                <li className="logoMain">
                    <Link to="/mainpage">
                        <img className="web-project-logo" alt="Web project logo" src="../images/web-project-logo-page-1.png" />
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
                    <div className="text-wrapper-3"><button onClick={Logout}>Log Out</button></div>
                </li>
                <button className="nav-btn nav-close-btn"
					onClick={toggleNav}>
					<FaTimes />
                </button>
                </ul>
            </nav>
            <button
                    className="nav-btn"
                    onClick={toggleNav}>
                    <FaBars/>
            </button>
            <Outlet />
        </div>
    );
    }

export default Layout;
