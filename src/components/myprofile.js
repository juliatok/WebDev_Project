import React, { useState } from 'react';
import PostForm from './postform';
import Post from './post';
import '../App.css'

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
  
    const handlePublish = (newPost) => {
      setPosts([...posts, newPost]);
      setShowPostForm(false);
    };
  
    const handleDelete = (index) => {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
    };
  
    const handleCancel = () => {
        setShowPostForm(false);
        setNewPost({ title: '', content: '' }); // Reset the form state
      };
    
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
                        <PostForm
                        post={newPost}
                        onPublish={handlePublish}
                        onCancel={handleCancel}
                        onChange={(field, value) => setNewPost({ ...newPost, [field]: value })}
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
                    {posts.map((post, index) => (
                    <div className='post' key={index}>
                        <Post post={post} />
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                        ))}
                </div>
            </div>
        </div>
    );
    }

export default MyProfile;
