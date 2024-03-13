

import { useEffect } from "react";
import Blogdetails from "../components/blogDetails";
import { useBlogContext } from "../hooks/useBlogContext";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton,  LinkedinShareButton } from 'react-share';


const UserProfile = () => {
    const { blogs, dispatch } = useBlogContext();
    const shareUrl = window.location.href; // URL to share
    const title = document.title; // Title to share

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:3002/api/blogs');
            const data = await res.json();

            if (res.ok) {
                dispatch({ type: 'GET_BLOGS', payload: data });
            }
            else {
                console.log("Error fetching blogs");
            }
        }
        fetchBlogs();
    }, []);
    return (
        <div className='container1'>
            <div className="profile-picture">
            <div className="sharelinks">
                    <button>Share:</button>
                    <FacebookShareButton url={shareUrl} quote={title}>
                        <img src="./images/facebook.png" alt="Facebook" />  
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={title}>
                        <img src="./images/twitter.png" alt="Twitter" />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} title={title}>
                        <img src="./images/linkedin.png" alt="Linkedin" />
                    </LinkedinShareButton>
                </div>
            <img src="./images/profilepic_place.jpeg" alt="Profile"/>
            <div class="info">
                <h1>My Account</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos delectus reiciendis dolorum sit quis voluptas incidunt repellat. Minus vitae cum ab repellendus doloribus, omnis iusto consequatur placeat tempora consectetur doloremque. </p>
                </div>
            </div>
            <div class="container2">
                <div className="buttons">
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
export default UserProfile; 
