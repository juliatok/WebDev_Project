import '../App.css';
import UserProfile from './userProfile';
import { Link } from 'react-router-dom';


const Reading = () => {
    return (
        <div className="reading-wrapper">
            <div className="floater">
                <div className="profile_read">
                    <div className="content">
                        <div className="row">
                            <Link to="/profile"> {UserProfile}
                            <img src="https://via.placeholder.com/100" alt="profile" />
                            </Link>
                            <h2>Author</h2>
                            <button className="follow-profile">Follow</button>
                        </div>
                        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                        </p>
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p> lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt lorem ipsum dolor
                    </p>
                </div>
            </div>
            <div className="blog-content">
                <h2>Blog Title</h2>
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                </p>
                <img src="https://via.placeholder.com/700x350" alt="profile" />
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec nunc luctus tincidunt
                </p>
            </div>
        </div>
    );
}

export default Reading;