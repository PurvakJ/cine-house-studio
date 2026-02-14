// src/components/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-rating">
        {'★'.repeat(testimonial.rating)}
        {'☆'.repeat(5 - testimonial.rating)}
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-author">
        <strong>- {testimonial.author}</strong>
        {testimonial.occasion && <span>{testimonial.occasion}</span>}
      </div>
    </div>
  );
};

export default TestimonialCard;