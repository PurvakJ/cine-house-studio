// src/api/api.js
import { API_URL } from "../config";

/* ===============================
   PUBLIC DATA (GET)
================================ */

// Gallery images
export const getGallery = async () => {
  const res = await fetch(`${API_URL}?action=gallery`);
  return res.json();
};

// Background images
export const getBackgrounds = async () => {
  const res = await fetch(`${API_URL}?action=backgrounds`);
  return res.json();
};

// Testimonials (Reviews)
export const getTestimonials = async () => {
  const res = await fetch(`${API_URL}?action=testimonials`);
  return res.json();
};

// ✅ Contacts (ADMIN)
export const getContacts = async () => {
  const res = await fetch(`${API_URL}?action=contacts`);
  return res.json();
};


/* ===============================
   ADMIN ACTIONS (POST)
================================ */

// Admin login
export const loginAdmin = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      ...data
    })
  });
  return res.json();
};

// Change admin password
export const changePassword = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "changePassword",
      ...data
    })
  });
  return res.json();
};

// Add gallery/background image
export const addImage = async (payload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addImage",
      ...payload
    })
  });
  return res.json();
};

// Delete image
export const deleteImage = async (payload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteImage",
      ...payload
    })
  });
  return res.json();
};


/* ===============================
   PUBLIC FORMS (POST)
================================ */

// Add review (Testimonials)
export const addReview = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addReview",
      ...data
    })
  });
  return res.json();
};

// Contact / Booking form
export const submitContact = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "contact",
      ...data
    })
  });
  return res.json();
};
// Add multiple images at once (NEW FUNCTION)
export const addMultipleImages = async (payload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addMultipleImages",
      ...payload
    })
  });
  return res.json();
};
