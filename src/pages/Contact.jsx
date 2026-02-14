// src/pages/Contact.jsx
import React, { useState } from 'react';
import { submitContact } from '../api/api';
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    bookingDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        package: '',
        bookingDate: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>Get in touch to book your session or ask any questions</p>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Create Something Beautiful</h2>
              <p>Whether you're planning a wedding, need professional portraits, or have any questions, we're here to help.</p>
              
              <div className="info-item">
                <h3>📍 Location</h3>
                <p>Canada</p>
              </div>

              <div className="info-item">
                <h3>📞 Phone</h3>
                <p>437-973-4414</p>
              </div>

              <div className="info-item">
                <h3>✉️ Email</h3>
                <p>Cinehousestudio05@gmail.com</p>
              </div>

              <div className="info-item">
                <h3>🕒 Hours</h3>
                <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: By appointment</p>
              </div>
            </div>

            <div className="contact-form-container">
              {submitted ? (
                <div className="success-message">
                  <h3>Thank You!</h3>
                  <p>We've received your message and will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {error && <div className="error-message">{error}</div>}
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="package">Package Interest</label>
                      <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="">Select a package</option>
                        <option value="basic">BirthDay</option>
                        <option value="standard">Ceremony</option>
                        <option value="premium">Marriage</option>
                        <option value="prewedding">Pre-Wedding</option>
                        <option value="custom">Custom Arrangements</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookingDate">Preferred Date</label>
                      <input
                        type="date"
                        id="bookingDate"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Tell us about your photography needs..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;