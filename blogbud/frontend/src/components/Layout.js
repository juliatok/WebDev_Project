import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import '../App.css';
import { SearchBar } from "./searchBar";
import { useState } from "react";
import { SearchResultsList } from "./searchResultList";

const Layout = () => {
    const [results, setResults] = useState([]);
    
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="nav-bar">
            <nav>
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
                </ul>
            </nav>
            <Outlet />
        </div>
    );
    }

export default Layout;
