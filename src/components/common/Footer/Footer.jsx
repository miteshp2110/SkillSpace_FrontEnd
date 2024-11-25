import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to={'about'} className="footer-link">About Us</Link>
                <Link to={"/"} className="footer-link">Home</Link>
            </div>
            <div className="footer-company">
                <span>© SkillSpace</span>
            </div>
        </footer>
    );
};

export default Footer;
