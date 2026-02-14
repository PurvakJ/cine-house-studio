// src/components/GalleryGrid.jsx
import React, { useState } from 'react';

const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openLightbox(image)}
          >
            <img src={image.imageUrl} alt={`Gallery ${image.id}`} loading="lazy" />
            <div className="gallery-overlay">
              <span>View</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <img src={selectedImage.imageUrl} alt="Enlarged view" />
        </div>
      )}
    </>
  );
};

export default GalleryGrid;