import { Outlet, Link } from "react-router-dom";
import '../App.css';

const Layout = () => {
    return (
        <div className="nav-bar">
            <nav>
                <ul>
                <li>
                    <Link to="/">Home/Logo</Link>
                </li>
                <li className="link">
                    <Link to="/about">About</Link>
                </li>
                <li className="link">
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li className="link">
                    <Link to="/categories">Categories</Link>
                </li>
                <li className="link">
                    <Link to="/myprofile">MyProfile</Link>
                </li>
                <li>
                    <input type="text" placeholder="Search..." /><button>Search</button>
                </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
    }

export default Layout;