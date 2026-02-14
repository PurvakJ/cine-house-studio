// src/pages/FAQs.jsx
import React, { useState } from 'react';
import './FAQs.css';
import { Link } from 'react-router-dom';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes CineHouseStudio different from other photography studios?",
      answer: "At CineHouseStudio, we blend cinematic storytelling with fine art photography. Our unique approach combines traditional techniques with modern aesthetics, creating timeless images that tell your story. We treat every shoot like a movie scene, focusing on authentic moments and artistic composition."
    },
    {
      question: "Do you offer custom themed photoshoots?",
      answer: "Absolutely! We specialize in creating custom themed photoshoots tailored to your vision. From vintage Hollywood glamour to bohemian dreamscapes, we work with you to conceptualize and bring your unique ideas to life. Our studio has an extensive collection of props, backdrops, and styling options."
    },
    {
      question: "How far in advance should I book my session?",
      answer: "We recommend booking at least 2-3 months in advance for regular sessions, and 6-8 months for weddings and large events. Peak wedding season (spring and fall) books up quickly, so early planning is essential to secure your preferred date."
    },
    {
      question: "Can I bring props or change outfits during the shoot?",
      answer: "Yes! We encourage clients to bring personal props and multiple outfit changes. Our studio sessions include access to our changing room, and we recommend 2-3 outfit changes for a 2-hour session. We'll help coordinate looks that photograph beautifully."
    },
    {
      question: "Do you offer both indoor and outdoor photography?",
      answer: "Yes, we offer both studio and location photography. Our 2000 sq ft studio features multiple shooting areas with natural light and professional lighting setups. For outdoor shoots, we have an extensive list of scenic locations and can also travel to locations meaningful to you."
    },
    {
      question: "What is your photography style?",
      answer: "Our signature style blends documentary candid shots with fine art portraits. We focus on capturing genuine emotions and moments while maintaining artistic composition and lighting. The result is a collection of images that feel both authentic and beautifully crafted."
    },
    {
      question: "Do you offer photo albums and prints?",
      answer: "Yes! We partner with premium print labs to offer heirloom-quality albums, fine art prints, and canvas wraps. Our albums are handcrafted using archival materials, ensuring your memories last for generations. All print products come with a satisfaction guarantee."
    },
    {
      question: "What happens if it rains on the day of my outdoor shoot?",
      answer: "We monitor weather closely and have a flexible rescheduling policy. If weather doesn't cooperate, we can either reschedule for another day or move the shoot to our studio, which offers beautiful natural light and various indoor setups. We'll work with you to find the best solution."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment plans for all our packages. A 50% deposit is required to book your date, with the remaining balance due before or on the day of your shoot. For weddings, we offer customized payment schedules to make planning easier."
    },
    {
      question: "Can I bring family or friends to my shoot?",
      answer: "Absolutely! While we maintain a professional environment, we welcome you to bring a friend or family member for support. They can help with outfit changes, provide genuine reactions for candid shots, and even assist with props. Just let us know in advance."
    }
  ];

  const studioHighlights = [
    {
      icon: "🎬",
      title: "Cinematic Approach",
      description: "Every photoshoot is treated like a movie production, with careful attention to lighting, composition, and storytelling."
    },
    {
      icon: "📸",
      title: "State-of-the-Art Equipment",
      description: "We use professional-grade cameras, lenses, and lighting equipment to ensure the highest quality images."
    },
    {
      icon: "🎨",
      title: "Artistic Editing",
      description: "Our post-processing combines technical precision with artistic vision, creating stunning final images."
    },
    {
      icon: "🌟",
      title: "5+ Years Experience",
      description: "With over half a decade of experience, we've captured hundreds of beautiful moments for our clients."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We meet to discuss your vision, preferences, and plan the perfect photoshoot."
    },
    {
      step: "02",
      title: "Planning",
      description: "We help with outfit selection, location scouting, and creating a shot list."
    },
    {
      step: "03",
      title: "The Shoot",
      description: "A relaxed, fun photoshoot where we capture authentic moments."
    },
    {
      step: "04",
      title: "Editing",
      description: "Professional post-processing to enhance and perfect your images."
    },
    {
      step: "05",
      title: "Delivery",
      description: "Receive your beautifully edited photos in an online gallery."
    }
  ];

  return (
    <div className="faqs-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-text">Your Questions, Answered</h1>
          <p className="animate-text-delay">Everything you need to know about working with CineHouseStudio</p>
        </div>
        <div className="hero-decoration">✦ ✦ ✦</div>
      </section>

      {/* Studio Highlights */}
      <section className="highlights-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Choose Us</span>
            <h2>The CineHouseStudio Experience</h2>
          </div>
          <div className="highlights-grid">
            {studioHighlights.map((item, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-main-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Common Queries</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openIndex === index ? 'open' : ''}`}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="question-text">{faq.question}</span>
                    <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sidebar with additional info */}
            <div className="faq-sidebar">
              <div className="info-card">
                <h3>Quick Contact</h3>
                <div className="contact-method">
                  <span>📞</span>
                  <div>
                    <strong>Call Us</strong>
                    <p>437-973-4414</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span>✉️</span>
                  <div>
                    <strong>Email Us</strong>
                    <p>Cinehousestudio05@gmail.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span>📍</span>
                  <div>
                    <strong>Visit Us</strong>
                    <p>Canada</p>
                  </div>
                </div>
              </div>
              
              <div className="info-card">
                <h3>Studio Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">How It Works</span>
            <h2>Your Journey With Us</h2>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < processSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="faq-cta">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p>We're here to help! Reach out to us for any additional inquiries.</p>
          <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
          <a href="tel:4379734414" className="btn btn-secondary">Call Now: 437-973-4414</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;