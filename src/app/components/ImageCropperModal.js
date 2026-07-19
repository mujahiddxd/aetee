import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function ImageCropperModal({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      onCropComplete(croppedImageBlob);
    } catch (e) {
      console.error(e);
      alert('Failed to crop image');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{ position: 'relative', width: '90%', height: '70%', background: '#333' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteInternal}
        />
      </div>
      <div style={{ padding: '16px', background: 'white', width: '90%', display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'black' }}>Zoom:</span>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onCancel} style={{ color: 'black', border: '1px solid #ccc' }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleCropImage}>Crop & Upload</button>
        </div>
      </div>
    </div>
  );
}
