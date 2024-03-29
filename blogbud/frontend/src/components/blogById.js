import '../App.css';
import UserProfile from '../components/userProfile';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Reading = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(''); 

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch('http://localhost:3001/api/blogs/' + id);
            const data = await res.json();

            if (res.ok) {
                console.log(data);
                setTitle(data.title);
                setAuthor(data.author);
                setBody(data.body);
                setDescription(data.description);
                setUserId(data.user_id); 
            }
            else {
                console.log("Error fetching blog");
            }
        }
        fetchBlog();
    }, [id]);

    return (
        <div className="reading-wrapper">
            <div className="floater">
                <div className="profile_read">
                    <div className="content1">
                        <div className="row">
                            <Link to={`/profile/${userId}`}> 
                            <img src="../images/profilepic_place.jpeg" alt="profile" />
                            </Link>
                            <h2 key={id}>{author} </h2>
                            <button className="follow-profile">Follow</button>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="blog-content">
                <h2>{title}</h2>
                <p>{body}</p>
                <img src="../images/blogpic_place.jpeg" alt="blogpic" />
                <p>
                </p>
            </div>
        </div>
    );
}

export default Reading;
