import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  getGallery,
  getBackgrounds,
  getTestimonials,
  getContacts,
  addImage,
  addMultipleImages,
  deleteImage,
  changePassword
} from '../api/api';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('gallery');
  const [gallery, setGallery] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Single image upload
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Multiple images upload - starts with one empty field
  const [multipleImageUrls, setMultipleImageUrls] = useState(['']);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  
  // Ref to track the last input for auto-focus
  const lastInputRef = useRef(null);

  const [message, setMessage] = useState({ type: '', text: '' });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    username: user?.username || 'admin',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'gallery') {
        setGallery(await getGallery());
      } else if (activeTab === 'backgrounds') {
        setBackgrounds(await getBackgrounds());
      } else if (activeTab === 'reviews') {
        setReviews(await getTestimonials());
      } else if (activeTab === 'contacts') {
        setContacts(await getContacts());
      }
    } catch (err) {
      showMessage('error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-focus the new input when added
  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [multipleImageUrls.length]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Single image upload
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImageUrl) return;

    setUploading(true);
    try {
      await addImage({
        type: activeTab === 'backgrounds' ? 'bg' : 'gallery',
        imageUrl: newImageUrl
      });
      setNewImageUrl('');
      showMessage('success', 'Image added successfully');
      fetchData();
    } catch {
      showMessage('error', 'Failed to add image');
    } finally {
      setUploading(false);
    }
  };

  // Handle change in URL field - automatically add new field if this is the last field and has value
  const handleUrlChange = (index, value) => {
    const updatedUrls = [...multipleImageUrls];
    updatedUrls[index] = value;
    setMultipleImageUrls(updatedUrls);

    // If this is the last field and it has a value, add a new empty field
    if (index === multipleImageUrls.length - 1 && value.trim() !== '') {
      setMultipleImageUrls([...updatedUrls, '']);
    }
  };

  // Handle key press - add new field on Enter if current field has value
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      // If current field has value, focus on next field or add new one
      if (multipleImageUrls[index].trim() !== '') {
        if (index === multipleImageUrls.length - 1) {
          // Add new field and focus it
          setMultipleImageUrls([...multipleImageUrls, '']);
        } else {
          // Focus next existing field
          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
          if (nextInput) nextInput.focus();
        }
      }
    }
  };

  // Remove URL field (only if it's not the last empty field)
  const removeUrlField = (index) => {
    // Don't allow removing the last field if it's the only one
    if (multipleImageUrls.length === 1) return;
    
    // Don't allow removing a field that has content if there are empty fields after it
    const updatedUrls = multipleImageUrls.filter((_, i) => i !== index);
    setMultipleImageUrls(updatedUrls);
  };

  // Check if a field can be removed (not the last field with content)
  const canRemoveField = (index) => {
    if (multipleImageUrls.length <= 1) return false;
    
    // Can remove if it's not the last field with content
    const lastNonEmptyIndex = multipleImageUrls.reduce((lastIndex, url, i) => {
      return url.trim() !== '' ? i : lastIndex;
    }, -1);
    
    return index <= lastNonEmptyIndex;
  };

  const handleAddMultipleImages = async (e) => {
    e.preventDefault();
    
    // Filter out empty URLs (including the last one which might be empty)
    const validUrls = multipleImageUrls.filter(url => url && url.trim() !== '');
    
    if (validUrls.length === 0) {
      showMessage('error', 'Please enter at least one image URL');
      return;
    }

    setBulkUploading(true);
    try {
      await addMultipleImages({
        type: activeTab === 'backgrounds' ? 'bg' : 'gallery',
        imageUrls: validUrls
      });
      
      // Reset form to single empty field
      setMultipleImageUrls(['']);
      setShowBulkUpload(false);
      showMessage('success', `${validUrls.length} images added successfully`);
      fetchData();
    } catch {
      showMessage('error', 'Failed to add images');
    } finally {
      setBulkUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Delete this image?')) return;

    try {
      await deleteImage({
        type: activeTab === 'backgrounds' ? 'bg' : 'gallery',
        id
      });
      showMessage('success', 'Image deleted');
      fetchData();
    } catch {
      showMessage('error', 'Failed to delete image');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return showMessage('error', 'All fields required');
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showMessage('error', 'Passwords do not match');
    }

    try {
      const res = await changePassword(passwordData);
      if (res.success) {
        showMessage('success', 'Password updated');
        setShowPasswordModal(false);
        setPasswordData({
          ...passwordData,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        showMessage('error', res.message);
      }
    } catch {
      showMessage('error', 'Password change failed');
    }
  };

  const renderContent = () => {
    if (loading) return <p className="loading">Loading...</p>;

    /* ---------------- IMAGES ---------------- */
    if (activeTab === 'gallery' || activeTab === 'backgrounds') {
      const images = activeTab === 'gallery' ? gallery : backgrounds;
      const imageType = activeTab === 'gallery' ? 'Gallery' : 'Background';

      return (
        <>
          <div className="upload-section">
            <div className="upload-header">
              <h3>Add {imageType} Images</h3>
              <div className="upload-toggle">
                <button 
                  className={`toggle-btn ${!showBulkUpload ? 'active' : ''}`}
                  onClick={() => {
                    setShowBulkUpload(false);
                    setMultipleImageUrls(['']);
                  }}
                >
                  Single Upload
                </button>
                <button 
                  className={`toggle-btn ${showBulkUpload ? 'active' : ''}`}
                  onClick={() => {
                    setShowBulkUpload(true);
                    setMultipleImageUrls(['']);
                  }}
                >
                  Bulk Upload
                </button>
              </div>
            </div>

            {!showBulkUpload ? (
              // Single image upload form
              <form onSubmit={handleAddImage} className="add-image-form">
                <div className="input-group">
                  <input
                    type="url"
                    placeholder="Enter image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="btn-primary"
                  >
                    {uploading ? 'Adding...' : 'Add Image'}
                  </button>
                </div>
              </form>
            ) : (
              // Multiple images upload form with auto-add feature
              <form onSubmit={handleAddMultipleImages} className="bulk-upload-form">
                <div className="bulk-instructions">
                  <small>Start typing URLs - new field appears automatically. Press Enter to jump to next field.</small>
                </div>
                
                {multipleImageUrls.map((url, index) => (
                  <div key={index} className="input-group">
                    <input
                      ref={index === multipleImageUrls.length - 1 ? lastInputRef : null}
                      type="url"
                      data-index={index}
                      placeholder={`Image URL ${index + 1}${index === multipleImageUrls.length - 1 ? ' (new field appears when you type)' : ''}`}
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      className={url.trim() !== '' ? 'filled' : ''}
                      autoComplete="off"
                    />
                    {canRemoveField(index) && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeUrlField(index)}
                        title="Remove this URL"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                <div className="bulk-actions">
                  <button
                    type="button"
                    onClick={() => setMultipleImageUrls([...multipleImageUrls, ''])}
                    className="btn-secondary"
                  >
                    + Add Another Field
                  </button>
                  <button
                    type="submit"
                    disabled={bulkUploading || multipleImageUrls.filter(u => u.trim()).length === 0}
                    className="btn-primary"
                  >
                    {bulkUploading ? 'Adding...' : `Upload ${multipleImageUrls.filter(u => u.trim()).length} Image${multipleImageUrls.filter(u => u.trim()).length !== 1 ? 's' : ''}`}
                  </button>
                </div>

                <div className="url-preview">
                  <strong>Ready to upload: {multipleImageUrls.filter(u => u.trim()).length} URL(s)</strong>
                </div>
              </form>
            )}
          </div>

          <div className="images-section">
            <h3>Current {imageType} Images ({images.length})</h3>
            {images.length === 0 ? (
              <p className="no-images">No images yet. Add your first image above.</p>
            ) : (
              <div className="admin-images-grid">
                {images.map(img => (
                  <div key={img.id} className="admin-image-card">
                    <img src={img.imageUrl} alt={`${imageType} ${img.id}`} loading="lazy" />
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteImage(img.id)}
                      title="Delete image"
                    >
                      ×
                    </button>
                    <small>{new Date(img.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    }

    /* ---------------- REVIEWS ---------------- */
    if (activeTab === 'reviews') {
      return (
        <>
          <h3>Customer Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p className="no-data">No reviews yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r, i) => (
                    <tr key={i}>
                      <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td>{r.name}</td>
                      <td>{r.email}</td>
                      <td className="rating">{'★'.repeat(r.rating)}</td>
                      <td className="review-text">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      );
    }

    /* ---------------- CONTACTS ---------------- */
    if (activeTab === 'contacts') {
      return (
        <>
          <h3>Contact Submissions ({contacts.length})</h3>
          {contacts.length === 0 ? (
            <p className="no-data">No contact submissions yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Package</th>
                    <th>Booking Date</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={i}>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone || '-'}</td>
                      <td>{c.package || '-'}</td>
                      <td>{c.bookingDate || '-'}</td>
                      <td className="message-cell">{c.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span className="welcome-text">Welcome, {user?.username || 'Admin'}!</span>
          <button onClick={() => setShowPasswordModal(true)} className="btn-secondary">
            Change Password
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-tabs">
        {['gallery', 'backgrounds', 'reviews', 'contacts'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => {
              setActiveTab(tab);
              setShowBulkUpload(false);
              setMultipleImageUrls(['']);
              setNewImageUrl('');
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <main className="dashboard-content">{renderContent()}</main>

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={e => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="btn-primary">Update</button>
                <button type="button" onClick={() => setShowPasswordModal(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;