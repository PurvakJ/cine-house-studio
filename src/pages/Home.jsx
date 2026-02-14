// Updated Home.jsx with more service clarity and contact info
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBackgrounds, getGallery } from '../api/api';
import './Home.css'; // import the new CSS

const Home = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentBg, setCurrentBg] = useState(0);
  const [featuredGallery, setFeaturedGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bgData = await getBackgrounds();
        setBackgrounds(bgData);

        const galleryData = await getGallery();
        setFeaturedGallery(galleryData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (backgrounds.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {backgrounds.map((bg, index) => (
          <div
            key={bg.id}
            className={`hero-slide ${index === currentBg ? 'active' : ''}`}
            style={{ backgroundImage: `url(${bg.imageUrl})` }}
          />
        ))}
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>CineHouseStudio</h1>
            <p>Where Every Frame Tells a Story</p>
            <Link to="/gallery" className="btn btn-primary">View Portfolio</Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <h2>Welcome to CineHouseStudio</h2>
          <p>
            We are passionate photographers dedicated to capturing life's most precious moments.
            From weddings to portraits, events to commercial shoots, we bring creativity and
            professionalism to every frame.
          </p>
          <Link to="/about" className="btn btn-secondary">Learn More About Us</Link>
        </div>
      </section>

      {/* Enhanced: Services Highlight with Detailed Work Descriptions */}
      <section className="services-highlight">
        <div className="container">
          <h2>📸 Our Expertise: Photography & Videography</h2>
          <div className="services-grid">
            <div className="service-item">
              <span className="emoji-icon">🎬</span>
              <h3>Prewedding Shoot</h3>
              <p className="service-tagline">Cinematic love stories</p>
              <ul className="service-details">
                <li>✨ Candid couple portraits in scenic locations</li>
                <li>🎥 3-5 minute cinematic highlight film</li>
                <li>📸 300+ edited high-resolution photos</li>
                <li>🏞️ Multiple outfit changes & locations</li>
                <li>✈️ Destination prewedding available</li>
              </ul>
            </div>
            
            <div className="service-item">
              <span className="emoji-icon">🎥</span>
              <h3>Cinematic Wedding</h3>
              <p className="service-tagline">Full wedding storytelling</p>
              <ul className="service-details">
                <li>💒 Full day coverage (8-10 hours)</li>
                <li>🎬 5-7 minute cinematic wedding film</li>
                <li>📸 600+ edited photos (ceremony + reception)</li>
                <li>⚡ Same-day edit option available</li>
                <li>🎵 Drone shots & aerial coverage</li>
              </ul>
            </div>
            
            <div className="service-item">
              <span className="emoji-icon">📸</span>
              <h3>Candid Photography</h3>
              <p className="service-tagline">Authentic moments, timeless memories</p>
              <ul className="service-details">
                <li>😊 Natural, unposed emotional moments</li>
                <li>👰 Wedding day candid coverage</li>
                <li>👨‍👩‍👧‍👦 Family & kids candid sessions</li>
                <li>🎉 Event candids (birthdays, parties, corporate)</li>
                <li>📷 Black & white artistic collection</li>
              </ul>
            </div>
            
            <div className="service-item">
              <span className="emoji-icon">🌍</span>
              <h3>Destination Ready</h3>
              <p className="service-tagline">We fly to your story</p>
              <ul className="service-details">
                <li>🇨🇦 Toronto, Vancouver, Montreal & all Canada</li>
                <li>🇮🇳 Punjab, Delhi, Mumbai & all India</li>
                <li>✈️ International weddings welcome</li>
                <li>🏨 Travel & accommodation included in packages</li>
                <li>🌴 Pre-wedding destinations worldwide</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* NEW: Additional Services Section */}
      <section className="additional-services">
        <div className="container">
          <h3>📋 Other Professional Services</h3>
          <div className="additional-grid">
            <div className="additional-item">
              <h4>🎂 Birthday Parties</h4>
              <p>1st birthdays, sweet 16, 18th, 21st, and milestone celebrations. 2-4 hours coverage with candid and group photos.</p>
            </div>
            <div className="additional-item">
              <h4>👔 Corporate Events</h4>
              <p>Conferences, product launches, annual galas, team building events. Professional headshots available.</p>
            </div>
            <div className="additional-item">
              <h4>🤰 Maternity & Newborn</h4>
              <p>Beautiful maternity shoots and newborn sessions in studio or natural light. Includes parent and sibling shots.</p>
            </div>
            <div className="additional-item">
              <h4>👨‍👩‍👧 Family Portraits</h4>
              <p>Outdoor or studio family sessions. Perfect for holiday cards and wall art.</p>
            </div>
            <div className="additional-item">
              <h4>💼 Professional Headshots</h4>
              <p>Corporate headshots, LinkedIn profiles, actor/model portfolios. Quick turnaround, digital delivery.</p>
            </div>
            <div className="additional-item">
              <h4>🛍️ Product Photography</h4>
              <p>E-commerce product shoots, flat lays, lifestyle product images for brands and small businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="featured-gallery">
        <div className="container">
          <h2>Featured Work</h2>
          <div className="gallery-preview">
            {featuredGallery.map((image) => (
              <div key={image.id} className="gallery-preview-item">
                <img src={image.imageUrl} alt="wedding or candid moment" />
              </div>
            ))}
          </div>
          <Link to="/gallery" className="btn btn-primary">View Full Gallery</Link>
        </div>
      </section>


      {/* Enhanced Contact Bar with Phone and Locations */}
      <section className="contact-bar">
        <div className="container">
          <div className="contact-item">
            <span>📞</span>
            <span>Call/WhatsApp:</span>
            <strong className="phone-number">437-973-4414</strong>
          </div>
          <div className="contact-item">
            <span>📍</span>
            <span>Available in:</span>
            <strong>Canada 🇨🇦</strong>
            <span className="country"> & </span>
            <strong>India 🇮🇳</strong>
          </div>
          <div className="contact-item">
            <span>✉️</span>
            <span>hello@cinehousestudio.com</span>
          </div>
          <div className="contact-item">
            <span>⏱️</span>
            <span>Response time:</span>
            <strong>&lt; 2 hours</strong>
          </div>
        </div>
      </section>

      {/* NEW: Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Capture Your Story?</h2>
          <p>Whether it's a wedding in Canada, a pre-wedding in India, or any special moment in between – we're here to make it timeless.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
            <a href="tel:4379734414" className="btn btn-secondary">Call Now: 437-973-4414</a>
          </div>
          <p className="cta-note">📍 Based in Toronto | 📍 Available in Punjab | ✈️ Worldwide Travel</p>
        </div>
      </section>
    </div>
  );
};

export default Home;