import React from "react";
import "../mainpage.css";

const Desktop = () => {
  return (
    <div className="desktop">
  <div className="overlap-wrapper">
    <div className="overlap">
      <div className="rectangle" />
      <div className="feed-container">
        <div className="suggestions">
          <div className="overlap-group">
            <img className="line" alt="Line" src=",/images/line-1.svg" />
            <div className="text-wrapper">Trending</div>
            <div className="div">New Releases</div>
          </div>
        </div>
        <div className="categories">
          <div className="div-wrapper">
            <div className="text-wrapper-2">Categories</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
export default Desktop;