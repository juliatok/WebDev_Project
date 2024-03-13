import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogdetails from "../components/blogDetails";
import { useBlogContext } from "../hooks/useBlogContext";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton,  LinkedinShareButton } from 'react-share';

const UserProfile = () => {
    const { blogs, dispatch } = useBlogContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user_id } = useParams();
    const shareUrl = window.location.href; // URL to share
    const title = document.title; // Title to share

    useEffect(() => {
        async function fetchUserAndBlogs() {
          const userId = user_id; // use user_id from useParams
          if (!userId) {
            console.error("User ID is undefined");
            return;
          }
      
          try {
            dispatch({ type: 'CLEAR_BLOGS' }); // Clear blogs state
    
            const response = await fetch(`http://localhost:3001/api/users/${userId}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const user = await response.json();
            setUser(user);
            setLoading(false);
    
            const res = await fetch(`http://localhost:3001/api/blogs/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const fetchedBlogs = await res.json();
            console.log('Blogs response:', res);
            console.log('Blogs data:', fetchedBlogs);
    
            if (res.ok) {
                dispatch({ type: 'GET_BLOGS', payload: fetchedBlogs });
            } else {
                console.log("Error fetching blogs");
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        fetchUserAndBlogs();
    }, [user_id, dispatch]);

    return (
        <div className='container1'>
            <div className="profile-picture">
                <div className="sharelinks">
                    <button>Share:</button>
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <img src="../images/facebook.png" alt="Facebook" />  
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                            <img src="../images/twitter.png" alt="Twitter" />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl} title={title}>
                            <img src="../images/linkedin.png" alt="Linkedin" />
                        </LinkedinShareButton>
                </div>
                <img src="../images/profilepic_place.jpeg" alt="Profile"/>
                <div className="info">
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : user ? (
                        <>
                            <h1>{user.username}</h1>
                            <p>{user.bio}</p>
                        </>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
            </div>
            <div className="container2">
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
