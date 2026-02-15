// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  const navLinks = [
    { path: '/', name: 'Home', number: '01' },
    { path: '/about', name: 'About', number: '02' },
    { path: '/gallery', name: 'Gallery', number: '03' },
    { path: '/faqs', name: 'Vies&', number: '04' },
    { path: '/testimonials', name: 'Reviews', number: '05' },
    { path: '/contact', name: 'Contact', number: '06' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <div className="logo-icon">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="60" height="40" stroke="#d4af37" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="15" stroke="#d4af37" strokeWidth="2" fill="none" />
              <path d="M35 30 L50 10 L65 30" stroke="#d4af37" strokeWidth="2" fill="none" />
              <path d="M35 70 L50 90 L65 70" stroke="#d4af37" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="3" fill="#d4af37" />
            </svg>
          </div>
          <div className="logo-text-container">
            <span className="logo-text-main">
              CINE<span>HOUSE</span>
            </span>
            <span className="logo-text-sub">STUDIO</span>
          </div>
          <span className="logo-accent">✦</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <div key={link.path} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-link-text">{link.name}</span>
              </Link>
            </div>
          ))}
        </div>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;