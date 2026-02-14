// src/pages/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import { getTestimonials, addReview } from '../api/api';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    rating: 5
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating
    });
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    try {
      await addReview(formData);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your review! It will be displayed shortly.' 
      });
      setFormData({ name: '', email: '', description: '', rating: 5 });
      setShowReviewForm(false);
      fetchTestimonials(); // Refresh testimonials
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to submit review. Please try again.' 
      });
    }
  };

  // Calculate average rating
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : 0;

  // Render stars function
  const renderStars = (rating, interactive = false, size = 'medium') => {
    const stars = [];
    const totalStars = 5;
    const displayRating = hoverRating || rating;
    
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= displayRating ? 'filled' : 'empty'} ${size} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => handleRatingClick(i) : null}
          onMouseEnter={interactive ? () => handleRatingHover(i) : null}
          onMouseLeave={interactive ? handleRatingLeave : null}
          role={interactive ? 'button' : 'presentation'}
          tabIndex={interactive ? 0 : -1}
          aria-label={interactive ? `Rate ${i} stars` : ''}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="testimonials-page">
      <section className="page-hero">
        <h1>Client Reviews</h1>
        <p>What our clients say about their experience with us</p>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-stats">
            <div className="stat">
              <h3>{averageRating}</h3>
              <p>Average Rating</p>
              <div className="stars-display">
                {renderStars(averageRating)}
              </div>
            </div>
            <div className="stat">
              <h3>{testimonials.length}</h3>
              <p>Total Reviews</p>
            </div>
            <div className="stat">
              <button 
                className="btn btn-primary"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="review-form-container">
              <h3>Share Your Experience</h3>
              {submitStatus.message && (
                <div className={`message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Your Rating *</label>
                  <div className="star-rating-container">
                    <div className="star-rating-input">
                      {renderStars(formData.rating, true, 'large')}
                    </div>
                    <span className="rating-text">
                      {formData.rating === 1 ? 'Poor' :
                       formData.rating === 2 ? 'Fair' :
                       formData.rating === 3 ? 'Good' :
                       formData.rating === 4 ? 'Very Good' :
                       'Excellent'}
                    </span>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Your Review *</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials Grid */}
          {loading ? (
            <div className="loading">
              <p>Loading reviews...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          ) : (
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id || index} 
                  testimonial={{
                    ...testimonial,
                    text: testimonial.description,
                    author: testimonial.name,
                    rating: testimonial.rating
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;