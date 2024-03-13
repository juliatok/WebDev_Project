import React, { useEffect, useState } from "react";
import "../mainpage.css";
import { Link } from "react-router-dom";

const Desktop = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch("http://localhost:3001/api/blogs/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []); 

  return (
    <div className="desktop">
      <div className="overlap-group">
        <div className="div">Releases</div>
        <div className="content">
          {posts.length > 0 ? (
            posts.reverse().map((post) => (
              <div className="blogpost" key={post.id}>
                <Link className="linkButton" to={`/profile/${post.user_id}`}>Author: {post.author}</Link>
                <Link className="postLink" to={`/blogs/${post._id}`}>{post.title}</Link>
                <p>description: {post.description}</p>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
