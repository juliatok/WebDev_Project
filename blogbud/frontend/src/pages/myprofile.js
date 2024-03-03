import { useEffect } from "react";
import Blogdetails from "../components/blogDetails";
import BlogForm from "../components/blogForm";
import { useBlogContext } from "../hooks/useBlogContext";
import { useState } from "react";



const MyProfile= () => {
    const { blogs, dispatch } = useBlogContext();
    const [ posts, setPost ] = useState('');
    const [showPostForm, setShowPostForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handlePublish = (newPost) => {
        setPost([...posts, newPost]);
        setShowPostForm(false);
      };

    const handleCancel = () => {
        setShowPostForm(false);
        setNewPost({ title: '', content: '' }); // Reset the form state
      };

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:3001/api/blogs');
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
        <div className='container'>
            <div className="profile-picture">
            <img src="https://via.placeholder.com/100" alt="Profile"/>
            <div class="info">
                <h1>My Account</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos delectus reiciendis dolorum sit quis voluptas incidunt repellat. Minus vitae cum ab repellendus doloribus, omnis iusto consequatur placeat tempora consectetur doloremque. </p>
                </div>
            </div>
            <div class="container2">
                <div className="buttons">
                    <div>
                        <button className='create-button' onClick={() => setShowPostForm(true)}>Create</button>
                        {showPostForm && (
                        <BlogForm 
                        post={newPost}
                        onPublish={handlePublish}
                        onCancel={handleCancel}
                        />
                        )}
                    </div>
                    <div>
                        <button className="share">Share</button>
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
