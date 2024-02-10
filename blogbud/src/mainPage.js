import React from "react";
import "./mainPage.css";

export const Desktop = () => {
  return (
    <div className="desktop">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <div className="suggestions">
            <div className="overlap-group">
              <img className="line" alt="Line" src="/img/line-1.svg" />
              <div className="text-wrapper">Trending</div>
              <div className="div">New Releases</div>
            </div>
          </div>
          <div className="categories">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Categories</div>
            </div>
          </div>
          <header className="header">
            <div className="overlap-2">
              <div className="rectangle-2" />
              <img className="ellipse" alt="Ellipse" src="/img/ellipse-1.svg" />
              <div className="rectangle-3" />
              <div className="text-wrapper-3">MY STORIES</div>
              <img className="web-project-logo" alt="Web project logo" src="/img/web-project-logo-page-1.png" />
              <div className="search-bar">
                <div className="overlap-3">
                  <div className="text-wrapper-4">Search</div>
                  <div className="group">
                    <div className="overlap-group-2">
                      <div className="ellipse-2" />
                      <img className="img" alt="Line" src="/img/line-2.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};