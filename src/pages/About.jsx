// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5+', label: 'Years in Canada' },
    { number: '10+', label: 'Years in India' },
    { number: '1000+', label: 'Happy Couples' }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Every click comes from a genuine love for storytelling, capturing raw emotions that make your moments unforgettable.'
    },
    {
      icon: '🎯',
      title: 'Precision',
      description: 'From lighting to composition, we obsess over every detail to ensure perfection in every frame we capture.'
    },
    {
      icon: '🤝',
      title: 'Connection',
      description: 'We build real relationships with our clients, making you feel comfortable and natural in front of the camera.'
    },
    {
      icon: '🌍',
      title: 'Global Perspective',
      description: 'With 15 years of experience across India and Canada, we understand and respect diverse wedding traditions.'
    }
  ];

  const features = [
    {
      number: '01',
      title: '15 Years of Excellence',
      description: 'With 15 years of photography experience, including the last 5 years in Canada, we bring unmatched expertise to every wedding.'
    },
    {
      number: '02',
      title: 'Dual Country Expertise',
      description: 'Deep understanding of both Canadian and Indian wedding traditions, ensuring your cultural needs are perfectly captured.'
    },
    {
      number: '03',
      title: 'Cinematic Storytelling',
      description: 'We treat every wedding like a film, creating narratives that go beyond just documenting events.'
    },
    {
      number: '04',
      title: 'Modern Equipment',
      description: 'Latest cameras, drones, and lighting equipment to ensure the highest quality results for your special day.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-text">About CineHouseStudio</h1>
          <p className="animate-text-delay">Where Every Frame Tells a Story – From Toronto to Punjab, We Capture Love Across Continents</p>
          <Link to="/contact" className="btn btn-primary animate-text-delay2">Book a Consultation</Link>
        </div>
      </section>

      {/* Founder's Note Section - NEW */}
      <section className="founder-section">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-message">
              <span className="section-subtitle">Founder's Note</span>
              <h2>Hi, I'm Ashish Kumar</h2>
              <p className="founder-tagline">15 Years Behind the Lens • 5 Years in Canada</p>
              <div className="founder-quote">
                <span className="quote-mark">"</span>
                <p>Photography isn't just my profession—it's my passion. For 15 years, I've had the privilege of capturing love stories across two countries. From the vibrant weddings of Punjab to the elegant celebrations in Toronto, every frame I capture is a piece of someone's heart.</p>
                <p>The last 5 years in Canada have been an incredible journey, allowing me to blend Eastern traditions with Western elegance in my work. When you choose CineHouseStudio, you're not just hiring a photographer—you're inviting a storyteller who genuinely cares about your memories.</p>
                <p className="founder-signature">— Ashish Kumar</p>
              </div>
              <div className="founder-contact">
                <div className="contact-chip">
                  <span>📞</span>
                  <a href="tel:4379734414">437-973-4414</a>
                </div>
                <div className="contact-chip">
                  <span>✉️</span>
                  <a href="mailto:Cinehousestudio05@gmail.com">Cinehousestudio05@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="founder-stats">
              <div className="stats-showcase">
                <div className="showcase-item">
                  <span className="showcase-number">15</span>
                  <span className="showcase-label">Years of Experience</span>
                </div>
                <div className="showcase-item">
                  <span className="showcase-number">5</span>
                  <span className="showcase-label">Years in Canada</span>
                </div>
                <div className="showcase-item">
                  <span className="showcase-number">10</span>
                  <span className="showcase-label">Years in India</span>
                </div>
                <div className="showcase-item">
                  <span className="showcase-number">1000+</span>
                  <span className="showcase-label">Weddings Captured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2>The CineHouseStudio Story</h2>
          </div>
          <div className="story-grid">
            <div className="story-content">
              <p className="story-tagline">Bridging Cultures Through Photography for 15 Years</p>
              <p>
                Founded in 2009 by Ashish Kumar, CineHouseStudio began with a simple vision: to create cinematic wedding stories 
                that transcend borders. For 10 years, we built our reputation in India, capturing the vibrant traditions and 
                emotional moments of Punjabi weddings.
              </p>
              <p>
                In 2019, we expanded to Canada, bringing our unique blend of Eastern storytelling and Western cinematic style 
                to Toronto and beyond. This dual-continent experience has made us specialists in destination weddings, 
                understanding exactly how to capture love stories that span cultures and countries.
              </p>
              <div className="experience-badges">
                <span className="badge">🇮🇳 10 Years in India</span>
                <span className="badge">🇨🇦 5 Years in Canada</span>
                <span className="badge">🌍 15 Years Total</span>
              </div>
            </div>
            <div className="story-highlights">
              <div className="highlight-card">
                <span className="highlight-year">2009</span>
                <h4>Founded in India</h4>
                <p>Started our journey in Punjab, capturing traditional Indian weddings</p>
              </div>
              <div className="highlight-card">
                <span className="highlight-year">2019</span>
                <h4>Expanded to Canada</h4>
                <p>Brought our expertise to Toronto, serving the Canadian-Indian community</p>
              </div>
              <div className="highlight-card">
                <span className="highlight-year">2024</span>
                <h4>15 Years Strong</h4>
                <p>Celebrating 15 years of capturing love stories across continents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Purpose</span>
            <h2>Mission & Vision</h2>
          </div>
          <div className="mission-grid">
            <div className="mission-item">
              <span className="mission-icon">🎯</span>
              <h3>Our Mission</h3>
              <p>To preserve your most precious moments through the art of cinematic photography and videography, creating timeless memories that you'll cherish for generations.</p>
            </div>
            <div className="mission-item">
              <span className="mission-icon">⭐</span>
              <h3>Our Vision</h3>
              <p>To become the most trusted wedding photography studio for couples with ties to both Canada and India, known for our 15 years of expertise, cultural sensitivity, and personalized service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What Drives Us</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Couples Trust Us</span>
            <h2>15 Years of Excellence</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-number">{feature.number}</span>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Tell Your Story?</h2>
          <p>Whether you're planning a wedding in Toronto or a celebration in Punjab, let's create something beautiful together.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Book a Free Consultation</Link>
            <Link to="/gallery" className="btn btn-outline">View Our Work</Link>
          </div>
          <div className="contact-info">
            <div className="contact-card">
              <span>📞</span>
              <div>
                <strong>Call or WhatsApp</strong>
                <a href="tel:4379734414">437-973-4414</a>
              </div>
            </div>
            <div className="contact-card">
              <span>✉️</span>
              <div>
                <strong>Email Us</strong>
                <a href="mailto:Cinehousestudio05@gmail.com">Cinehousestudio05@gmail.com</a>
              </div>
            </div>
            <div className="contact-card">
              <span>📍</span>
              <div>
                <strong>Serving</strong>
                <p>Canada • Punjab, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;