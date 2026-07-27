"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export default function AddressModal({ isOpen, onClose, onSuccess }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const SHOP_ADDRESS = "NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089";

  const checkDistance = useCallback((destinationAddress, locationGeometry = null) => {
    console.log("Checking distance for:", destinationAddress);
    setLoading(true);
    setError('');

    try {
      if (!window.google || !window.google.maps) {
        setLoading(false);
        setError("Google Maps is not loaded yet. Please wait a moment or check your connection.");
        return;
      }

      const service = new window.google.maps.DistanceMatrixService();
      console.log("Calling getDistanceMatrix...");
      service.getDistanceMatrix(
        {
          origins: [SHOP_ADDRESS],
          destinations: locationGeometry ? [locationGeometry] : [destinationAddress],
          travelMode: 'DRIVING',
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          console.log("DistanceMatrix response:", status, response);
          setLoading(false);
          if (status === 'OK' && response && response.rows && response.rows[0] && response.rows[0].elements[0].status === 'OK') {
            const distanceInMeters = response.rows[0].elements[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            
            if (distanceInKm > 40) {
              setError(`Sorry, we cannot deliver here. It is ${distanceInKm.toFixed(1)}km away (Max limit is 40km).`);
            } else {
              // Success! Save to sessionStorage and call onSuccess
              const deliveryInfo = {
                address: destinationAddress,
                distance: distanceInKm
              };
              sessionStorage.setItem('deliveryLocation', JSON.stringify(deliveryInfo));
              onSuccess(deliveryInfo);
            }
          } else {
            let errorMsg = 'Could not calculate distance. Please try a more specific address.';
            if (status !== 'OK') {
               errorMsg = `API Error: ${status}. Please ensure Distance Matrix API is enabled in Google Cloud.`;
            } else if (response && response.rows && response.rows[0] && response.rows[0].elements[0].status === 'ZERO_RESULTS') {
               errorMsg = 'Could not find a driving route to this address.';
            } else if (response && response.rows && response.rows[0]) {
               errorMsg = `Route Error: ${response.rows[0].elements[0].status}`;
            }
            setError(errorMsg);
          }
        }
      );
    } catch (err) {
      console.error("Error in checkDistance:", err);
      setLoading(false);
      setError("An unexpected error occurred while checking distance.");
    }
  }, [onSuccess]);

  useEffect(() => {
    if (!isOpen) return;

    const initAutocomplete = () => {
      if (window.google && window.google.maps && window.google.maps.places && inputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "IN" },
          fields: ["formatted_address", "geometry", "name"],
        });

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.formatted_address) {
            setAddress(place.formatted_address);
            if (place.geometry) {
              checkDistance(place.formatted_address, place.geometry.location);
            } else {
              checkDistance(place.formatted_address);
            }
          }
        });
      }
    };

    if (!window.google || !window.google.maps || !window.google.maps.places) {
      const scriptId = "google-maps-script";
      const script = document.getElementById(scriptId);
      if (script) {
        script.addEventListener("load", initAutocomplete);
        script.addEventListener("error", () => {
          setError("Network Error: Failed to load Google Maps. Please disable ad-blockers and try again.");
        });
        return () => {
          script.removeEventListener("load", initAutocomplete);
        };
      } else {
        // Fallback if script tag is not found
        setTimeout(initAutocomplete, 1000);
      }
    } else {
      initAutocomplete();
    }
  }, [isOpen, checkDistance]);



  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!window.google || !window.google.maps) {
          setLoading(false);
          setError("Google Maps is not loaded yet.");
          return;
        }

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Reverse geocode to get the address string
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };
        
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            const currentAddress = results[0].formatted_address;
            setAddress(currentAddress);
            if (inputRef.current) inputRef.current.value = currentAddress;
            checkDistance(currentAddress, latlng);
          } else {
            setLoading(false);
            setError("Unable to fetch your current location. Please enter your location manually.");
          }
        });
      },
      (error) => {
        setLoading(false);
        setError("Unable to fetch your current location. Please enter your location manually.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleManualSubmit = () => {
    if (!address) {
      setError('Please enter a delivery address.');
      return;
    }
    checkDistance(address);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>Delivery Address Details</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>&times;</button>
        </div>
        
        <div style={{ padding: '24px' }}>
          <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '0.9rem' }}>
            Please enter the exact drop location for a hassle free delivery experience
          </p>
          
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search for a building, street name, or area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 40px',
                borderRadius: '8px',
                border: '1px solid #DDD',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <svg style={{ position: 'absolute', left: '12px', top: '14px', width: '20px', height: '20px', color: '#EA4335' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          
          <button 
            onClick={handleUseLocation}
            disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EA4335',
              backgroundColor: '#FFF0F0', color: '#D32F2F', fontWeight: '600', cursor: 'pointer',
              marginBottom: '16px', transition: 'background 0.2s'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            Use your location
          </button>
          
          {error && <div style={{ color: '#D32F2F', backgroundColor: '#FEF6F6', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
          
          <button 
            onClick={handleManualSubmit}
            disabled={loading || !address}
            style={{
              width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
              backgroundColor: (loading || !address) ? '#CCC' : '#5A3424', color: '#FFF', fontWeight: 'bold', fontSize: '1rem',
              cursor: (loading || !address) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Checking Distance...' : 'CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  );
}
