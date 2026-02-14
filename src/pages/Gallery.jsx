import React, { useState, useEffect, useCallback } from "react";
import { getGallery } from "../api/api";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippingPage, setFlippingPage] = useState(null); 
  // "right" for next
  // "left" for previous

  const imagesPerPage = 4;
  const BOOK_LIMIT = 40;

  /* ---------------- FETCH IMAGES ---------------- */

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGallery();

        // latest first
        const sorted = [...data].reverse();
        setImages(sorted);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /* ---------------- BOOK + COLLAGE SPLIT ---------------- */

  const bookImages = images.slice(0, BOOK_LIMIT);
  const collageImages = images.slice(BOOK_LIMIT);

  const totalPages = Math.ceil(bookImages.length / (imagesPerPage * 2));

  const getCurrentPageImages = useCallback(() => {
    const startIndex = currentPage * imagesPerPage * 2;
    return bookImages.slice(
      startIndex,
      startIndex + imagesPerPage * 2
    );
  }, [currentPage, bookImages, imagesPerPage]);

  const currentImages = getCurrentPageImages();
  const leftPageImages = currentImages.slice(0, imagesPerPage);
  const rightPageImages = currentImages.slice(
    imagesPerPage,
    imagesPerPage * 2
  );

  /* ---------------- PAGE NAVIGATION ---------------- */

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlippingPage("right");
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
      }, 450);

      setTimeout(() => {
        setIsFlipping(false);
        setFlippingPage(null);
      }, 900);
    }
  }, [currentPage, totalPages, isFlipping]);

  const prevPage = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setFlippingPage("left");
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
      }, 450);

      setTimeout(() => {
        setIsFlipping(false);
        setFlippingPage(null);
      }, 900);
    }
  }, [currentPage, isFlipping]);

  /* ---------------- FULLSCREEN ---------------- */

  const navigateImage = useCallback((direction) => {
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + direction;

      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;

      setSelectedImage(images[newIndex]);
      return newIndex;
    });
  }, [images]);

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  /* ---------------- KEYBOARD EVENTS ---------------- */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "PageUp" && !isFlipping) prevPage();
      if (e.key === "PageDown" && !isFlipping) nextPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateImage, prevPage, nextPage, isFlipping]);

  /* ---------------- HELPERS ---------------- */

  const getImageStyle = (index) => {
    const styles = ["polaroid", "vintage", "polaroid", "vintage"];
    return styles[index % styles.length];
  };

  const getGlobalIndex = (pageIndex, isRightPage = false) => {
    const baseIndex = currentPage * imagesPerPage * 2;
    const offset = isRightPage ? imagesPerPage : 0;
    return baseIndex + offset + pageIndex;
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Opening the book...</p>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* HEADER */}
      <div className="gallery-header">
        <div className="container">
          <h1>Memory Book</h1>
          <p>Four precious moments on each page</p>
        </div>
      </div>

      {/* BOOK SECTION */}
      <div className="gallery-container">
        <div className="book-pages">

          {/* LEFT PAGE */}
          <div
            className={`book-page left ${
              flippingPage === "left" ? "flip-prev" : ""
            }`}
          >
            <div className="page-header">
              <span className="page-number">
                Page {currentPage * 2 + 1}
              </span>
              <span className="page-decoration">✧ ✦ ✧</span>
            </div>

            <div className="page-grid">
              {leftPageImages.map((image, index) => (
                <div
                  key={image.id || index}
                  className={`gallery-item ${getImageStyle(index)}`}
                  onClick={() =>
                    openFullscreen(getGlobalIndex(index, false))
                  }
                >
                  <div className="image-frame">
                    <img
                      src={image.imageUrl}
                      alt={image.title || "Gallery"}
                      loading="lazy"
                    />
                  </div>

                  {image.title && (
                    <div className="image-caption">
                      <h3>{image.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PAGE */}
          <div
            className={`book-page right ${
              flippingPage === "right" ? "flip-next" : ""
            }`}
          >
            <div className="page-header">
              <span className="page-number">
                Page {currentPage * 2 + 2}
              </span>
              <span className="page-decoration">✧ ✦ ✧</span>
            </div>

            <div className="page-grid">
              {rightPageImages.map((image, index) => (
                <div
                  key={image.id || index}
                  className={`gallery-item ${getImageStyle(index + 2)}`}
                  onClick={() =>
                    openFullscreen(getGlobalIndex(index, true))
                  }
                >
                  <div className="image-frame">
                    <img
                      src={image.imageUrl}
                      alt={image.title || "Gallery"}
                      loading="lazy"
                    />
                  </div>

                  {image.title && (
                    <div className="image-caption">
                      <h3>{image.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOOK NAVIGATION */}
      <div className="book-navigation">
        <button
          className="nav-button"
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
        >
          ←
        </button>

        <span className="page-indicator">
          Page {currentPage * 2 + 1} -{" "}
          {Math.min(currentPage * 2 + 2, totalPages * 2)} of{" "}
          {totalPages * 2}
        </span>

        <button
          className="nav-button"
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1 || isFlipping}
        >
          →
        </button>
      </div>

      {/* COLLAGE SECTION */}
      {collageImages.length > 0 && (
        <div className="collage-section">
          <h2>More Memories</h2>

          <div className="collage-grid">
            {collageImages.map((image, index) => (
              <div
                key={image.id || index}
                className={`collage-item ${
                  index % 7 === 0 ? "big" : ""
                }`}
                onClick={() =>
                  openFullscreen(index + BOOK_LIMIT)
                }
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {selectedImage && (
        <div
          className="fullscreen-modal"
          onClick={closeFullscreen}
        >
          <button
            className="modal-close"
            onClick={closeFullscreen}
          >
            ×
          </button>

          <button
            className="modal-nav modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
          >
            ‹
          </button>

          <button
            className="modal-nav modal-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
          >
            ›
          </button>

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
            />

            {selectedImage.title && (
              <div className="modal-caption">
                <h3>{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p>{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>

          <div className="modal-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;