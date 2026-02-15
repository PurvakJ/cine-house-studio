import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = [
    { text: "Calibrating lenses...", icon: "📷" },
    { text: "Adjusting aperture...", icon: "⚡" },
    { text: "Focusing composition...", icon: "🎯" },
    { text: "Setting up lighting...", icon: "💡" },
    { text: "Loading presets...", icon: "🎨" },
    { text: "Preparing gallery...", icon: "🖼️" },
    { text: "Almost ready...", icon: "✨" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30);

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete, loadingMessages.length]);

  return (
    <div className={`loader ${fadeOut ? 'loader--fade-out' : ''}`}>
      <div className="loader__gradient"></div>
      
      <div className="loader__container">
        {/* Camera Icon - Responsive */}
        <div className="loader__camera">
          <div className="loader__camera-body">
            <div className="loader__lens">
              <div className="loader__lens-ring"></div>
              <div className="loader__lens-inner"></div>
            </div>
            <div className="loader__viewfinder"></div>
            <div className="loader__hotshoe"></div>
          </div>
          <div className="loader__brand">
            <span>CINE</span>
            <span>HOUSE STUDIO</span>
          </div>
        </div>

        {/* Progress Ring - Scales perfectly */}
        <div className="loader__progress-ring">
          <svg className="loader__ring-svg" viewBox="0 0 120 120">
            <circle
              className="loader__ring-bg"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(212, 175, 55, 0.1)"
              strokeWidth="4"
            />
            <circle
              className="loader__ring-progress"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#d4af37"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="loader__percentage">
            <span className="loader__number">{progress}</span>
            <span className="loader__percent">%</span>
          </div>
        </div>

        {/* Progress Bar - Full width on mobile */}
        <div className="loader__bar-container">
          <div className="loader__bar">
            <div 
              className="loader__bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loader__bar-steps">
            <span className="loader__step"></span>
            <span className="loader__step"></span>
            <span className="loader__step"></span>
            <span className="loader__step"></span>
            <span className="loader__step"></span>
          </div>
        </div>

        {/* Message - Responsive text */}
        <div className="loader__message">
          <span className="loader__message-icon">
            {loadingMessages[currentMessageIndex].icon}
          </span>
          <span className="loader__message-text">
            {loadingMessages[currentMessageIndex].text}
          </span>
        </div>

        {/* Film Strip - Responsive grid */}
        <div className="loader__film-strip">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="loader__film-frame">
              <div className="loader__frame-hole"></div>
              <div className="loader__frame-hole"></div>
              <div className="loader__frame-hole"></div>
            </div>
          ))}
        </div>

        {/* Tagline - Responsive */}
        <div className="loader__tagline">
          <span>✦</span>
          <span>capturing moments since 2010</span>
          <span>✦</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;