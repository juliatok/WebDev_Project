import { useEffect, useState } from "react";
import Blogdetails from "../components/blogDetails";
import { useBlogContext } from "../hooks/useBlogContext";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton,  LinkedinShareButton } from 'react-share';
import facebookImage from './face.png';
import twitterImage from './twitter.png';
import linkedinImage from './LinkedIn.png';


const MyProfile = ({ userId }) => {
    const { blogs, dispatch } = useBlogContext();
    const [bio, setBio] = useState('');
    const shareUrl = window.location.href; // URL to share
    const title = document.title; // Title to share

    const toggleEdit = () => {
        const editBio = prompt("Edit your bio", bio);
        setBio(editBio);
        fetch(`http://localhost:3001/api/users/${userId}/bio`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bio: editBio })
        });
        console.log(userId);
    };

    useEffect(() => {
        const fetchBio = async () => {
            const res = await fetch(`http://localhost:3001/api/users/${userId}/bio`);
            const data = await res.json();

            if (res.ok) {
                setBio(data.bio);
            } else {
                console.log("Error fetching bio");
            }
        };

        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:3001/api/blogs');
            const data = await res.json();

            if (res.ok) {
                dispatch({ type: 'GET_BLOGS', payload: data });
            } else {
                console.log("Error fetching blogs");
            }
        };

        fetchBio();
        fetchBlogs();
    }, [dispatch, userId]);
    return (
        <div className='container1'>
            <div className="profile-picture">
            <div className="sharelinks">
                <button>Share:</button>
                <FacebookShareButton url={shareUrl} quote={title}>
                    <img src={facebookImage} alt="Facebook" />  
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                    <img src={twitterImage} alt="Twitter" />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={title}>
                    <img src={linkedinImage} alt="Linkedin" />
                </LinkedinShareButton>
            </div>
            <img src="https://via.placeholder.com/100" alt="Profile"/>

            <div class="info">
                <h1>My Account</h1>
                <p>{bio}</p>
                <button onClick={toggleEdit}>Edit</button>
                </div>
            </div>
            <div class="container2">
                <div className="buttons">
                    <div>
                        <Link to="/blogform">
                            <button className='create-button'>+</button>
                        </Link>
                    </div>
                    <div>
                         <button className="follow-profile">Follow</button>
                    </div>
                </div>
                <div className='posts'>
                        {blogs && blogs.map((blog) => (
                        <Blogdetails blog={blog} key={blog.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default MyProfile; 
