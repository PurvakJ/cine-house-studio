// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CineHouseStudio</h3>
          <p>Capturing moments, creating memories through the lens of passion and creativity.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin/login">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>📞 437-973-4414</li>
            <li>✉️ Cinehousestudio05@gmail.com</li>
            <li>📍 Canada</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/cinehousestudio?igsh=MTY2Y2kxZXo0eDBhdg%3D%3D" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
            <a href="https://share.google/DxGnyxNf996nCwiGM" target="_blank" rel="noopener noreferrer">📘 Tik-Tok</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CineHouseStudio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;