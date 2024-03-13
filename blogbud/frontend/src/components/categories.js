import React, { useState, useEffect } from "react";
import "../mainpage.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = ["Music", "Sports", "Technology", "Gaming", "Travel", "LifeStyle"];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch blog posts based on selected category (tag)
    const fetchBlogPosts = async () => {
      if (!selectedCategory) {
        // If no category is selected, clear posts or set them to a default value
        setPosts([]);
        return;
      }

      try {
        const url = `http://localhost:3001/api/blogs?tag=${encodeURIComponent(selectedCategory)}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setPosts([]); // Optionally clear posts or handle the error differently
      }
    };

    fetchBlogPosts();
  }, [selectedCategory]); // Dependency array includes selectedCategory, fetch posts when it changes

  return (
    <div className="desktop">
      <div className="overlap-group">
        <div className="div">Categories</div>
        <div className="content">
          {categories.map((category) => (
            <button
              className="categorybuttons"
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}

          {selectedCategory && <div>Selected Category: {selectedCategory}</div>}

          {posts.length > 0 ? (
            posts.reverse().map((post) => (
              <div className="blogpost" key={post.tag}> {/* Ensure you use the correct identifier attribute (e.g., _id) */}
                <Link className="linkButton" to="/profile">Author Page</Link>
                <Link className="postLink" to={`/blogs/${post.id}`}>{post.title}</Link>
                <p>{post.description}</p>
              </div>
            ))
          ) : (
            <p>No blog posts found for the selected category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
