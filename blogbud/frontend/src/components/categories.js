import React, { useState } from "react";
import "../mainpage.css";

const Categories = () => {
  // Sample categories
  const categories = ["Music", "Sports", "Technology", "Gaming", "Travel", "Life Style"];

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // fetch the posts related to the selected category, here.
    // and render them or update state to cause the rendering of related posts.
  };
  return (
    <div className="desktop">
  <div className="overlap-wrapper">
    <div className="overlap">
      <div className="rectangle" />
      <div className="feed-container">
        <div className="suggestions">
          <div className="overlap-group">
            <div className="div">Categories</div>
            <div className="content">
            {categories.map((category) => (
                    <button key={category} onClick={() => handleCategoryClick(category)}>
                      {category}
                    </button>
                  ))}
                  {selectedCategory && <div>Selected Category: {selectedCategory}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
export default Categories;