import React from "react";
import "./mainPage.css";

export const Desktop = () => {
  return (
    <div className="desktop">
  <div className="overlap-wrapper">
    <div className="overlap">
      <div className="rectangle" />
      <div className="feed-container">
        <div className="suggestions">
          <div className="overlap-group">
            <img className="line" alt="Line" src="line-1.svg" />
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
      <header className="header">
        <div className="overlap-2">
          <div className="rectangle-2" />
          <img className="ellipse" alt="Ellipse" src="ellipse-1.svg" />
          <div className="rectangle-3" />
          <div className="text-wrapper-3">STORIES</div>
          <img
            className="web-project-logo"
            alt="Web project logo"
            src="web-project-logo-page-1.png"
          />
          <input className="search-bar" placeholder="search" />
          <div className="group">
            <div className="overlap-group-2">
              <div className="ellipse-2" />
              <img className="img" alt="Line" src="line-2.svg" />
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</div>
  );
};