import React, { useState } from 'react';

const ImageUploader = ({ type, onUploaded }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    upload(file);
  };

  const upload = async (file) => {
    setUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const res = await fetch(
        'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
            data: reader.result.split(',')[1],
            type
          })
        }
      );

      const data = await res.json();
      if (data.success) onUploaded(data.imageUrl);
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`drop-zone ${dragging ? 'dragging' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {uploading ? 'Uploading...' : 'Drag & Drop Image Here'}
    </div>
  );
};

export default ImageUploader;
