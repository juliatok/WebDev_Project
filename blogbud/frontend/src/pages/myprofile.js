import { useEffect, useState, useRef } from "react";
import Blogdetails from "../components/blogDetails";
import { useBlogContext } from "../hooks/useBlogContext";
import useMyProfileContext from '../hooks/useMyProfileContext';
import MyProfileContext from '../context/myprofileContext';
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton,  LinkedinShareButton } from 'react-share';
import facebookImage from './face.png';
import twitterImage from './twitter.png';
import linkedinImage from './LinkedIn.png';

const MyProfile = () => {
    const { blogs, dispatch } = useBlogContext();
    const initialUser = useMyProfileContext();
    const [user, setUser] = useState(initialUser);
    const [bio, setBio] = useState('');
    const shareUrl = window.location.href; // URL to share
    const title = document.title; // Title to share

    const toggleEdit = () => {
        const editBio = prompt("Edit your bio", bio);
        setBio(editBio);
        if (user && user._id) {
            fetch(`http://localhost:3001/api/users/${user._id}/bio`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: editBio })
            });
        }
        console.log(user?._id);
    };

    const hasFetchedUser = useRef(false);

    useEffect(() => {

        const fetchUser = async () => {
            const storedUser = localStorage.getItem('user');
            console.log('storedUser:', storedUser); // Log the stored user data
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                console.log('parsedUser:', parsedUser); // Log the parsed user data
                setUser(parsedUser);
            } else {
                const res = await fetch(`http://localhost:3001/api/users/myprofile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const fetchedUser = await res.json(); // Renamed 'data' to 'fetchedUser'
                console.log('fetchedUser:', fetchedUser); // Log the fetched user data

                if (res.ok) {
                    setUser(fetchedUser);
                    localStorage.setItem('user', JSON.stringify(fetchedUser));
                } else {
                    console.log("Error fetching user");
                }

                hasFetchedUser.current = true;
            }
        }

        if (hasFetchedUser.current) {
            console.log('userId:', user?._id); // Log the userId
            fetchUser();
        };

        fetchUser();
    }, []);

        useEffect(() => {

        const fetchBio = async () => {
            if (user && user._id) {
                const res = await fetch(`http://localhost:3001/api/users/${user._id}/bio`);
                const fetchedBio = await res.json(); // Renamed 'data' to 'fetchedBio'

                if (res.ok) {
                    setBio(fetchedBio.bio);
                } else {
                    console.log("Error fetching bio");
                }
            }
        };
        fetchBio();
    }, [user?._id]);

    useEffect(() => {

        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:3001/api/blogs');
            const fetchedBlogs = await res.json(); // Renamed 'data' to 'fetchedBlogs'

            if (res.ok) {
                dispatch({ type: 'GET_BLOGS', payload: fetchedBlogs });
            } else {
                console.log("Error fetching blogs");
            }
        };

        fetchBlogs();
    }, [ dispatch, user?._id ]);

    console.log('user:', user); // Log the user data

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <MyProfileContext.Provider value={user}>
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
                <h1>{user.username}</h1>
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
        </MyProfileContext.Provider>
    );
}

export default MyProfile;
