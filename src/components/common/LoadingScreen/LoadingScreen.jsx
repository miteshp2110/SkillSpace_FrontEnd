import React from "react";
import "./LoadingScreen.css"; // Create this file for styles

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingScreen;
