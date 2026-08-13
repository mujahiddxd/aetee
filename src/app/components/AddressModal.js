"use client";

import Script from "next/script";
import { useState, useEffect, useRef, useCallback } from 'react';

export default function AddressModal({ isOpen, onClose, onSuccess }) {
  const [mapsReady, setMapsReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.google?.maps?.places)
  );
  const [address, setAddress] = useState('');
  const addressRef = useRef('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [deliveryType, setDeliveryType] = useState('DELIVERY');
  const isPickup = deliveryType === 'PICKUP';

  const SHOP_ADDRESS = "NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089";

  const checkDistance = useCallback((destinationAddress, locationGeometry = null, pincode = '') => {
    if (!isOpen || !mapsReady) return;
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
                distance: distanceInKm,
                pincode: pincode,
                deliveryType: 'DELIVERY'
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
  }, [onSuccess, isOpen, mapsReady]);

  useEffect(() => {
    if (!isOpen) return;

    if (window.google && window.google.maps && window.google.maps.places) {
      setMapsReady(true);
      return;
    }

    const intervalId = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setMapsReady(true);
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const autocompleteRef = useRef(null);
  const listenerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mapsReady || !inputRef.current) return;

    // 1. Initialize Autocomplete and static listeners EXACTLY ONCE per mount
    if (!autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "IN" },
        fields: ["formatted_address", "geometry", "name", "address_components"],
      });

      // Prevent Google from submitting the form on Enter
      inputRef.current.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
      });

      // If the user typed before the autocomplete was ready, re-trigger
      // so the widget picks up the existing text and shows suggestions.
      if (inputRef.current.value.length > 0) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
            // Also refocus to nudge the dropdown open
            inputRef.current.focus();
          }
        }, 100);
      }
    }

    // 2. Clean up old place_changed listener if checkDistance changes (due to re-renders)
    if (listenerRef.current) {
      window.google.maps.event.removeListener(listenerRef.current);
    }

    // 3. Attach new place_changed listener with the latest closure
    listenerRef.current = autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        let currentAddress = place.formatted_address;
        let extractedPincode = '';
        if (place.address_components) {
          const postalComponent = place.address_components.find(c => c.types.includes("postal_code"));
          if (postalComponent) {
            extractedPincode = postalComponent.long_name;
            if (!currentAddress.includes(extractedPincode)) {
              currentAddress = currentAddress + " - " + extractedPincode;
            }
          }
        }

        // If no pincode was found in the place data but we have geometry,
        // do a reverse geocode to fetch the pincode (same as "use location" flow)
        if (!extractedPincode && place.geometry && place.geometry.location) {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = {
            lat: typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat,
            lng: typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng
          };
          geocoder.geocode({ location: latlng }, (results, status) => {
            let reversePin = '';
            if (status === "OK" && results && results.length > 0) {
              for (const result of results) {
                const postalComp = result.address_components?.find(c => c.types.includes("postal_code"));
                if (postalComp) {
                  reversePin = postalComp.long_name;
                  break;
                }
              }
            }
            if (reversePin && !currentAddress.includes(reversePin)) {
              currentAddress = currentAddress + " - " + reversePin;
            }
            addressRef.current = currentAddress;
            setAddress(currentAddress);
            if (inputRef.current) inputRef.current.value = currentAddress;
            checkDistance(currentAddress, place.geometry.location, reversePin);
          });
        } else {
          addressRef.current = currentAddress;
          setAddress(currentAddress);
          if (inputRef.current) inputRef.current.value = currentAddress;
          if (place.geometry) {
            checkDistance(currentAddress, place.geometry.location, extractedPincode);
          } else {
            checkDistance(currentAddress, null, extractedPincode);
          }
        }
      }
    });

    return () => {
      // Clean up listener on unmount
      if (listenerRef.current) {
        window.google.maps.event.removeListener(listenerRef.current);
        listenerRef.current = null;
      }
    };
  }, [isOpen, mapsReady, checkDistance]);



  const handleUseLocation = () => {
    if (!isOpen || !mapsReady) {
      setError("Google Maps is not ready yet.");
      return;
    }
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
          if (status === "OK" && results.length > 0) {
            let currentAddress = results[0].formatted_address;
            let postalCode = "";
            for (const result of results) {
              const postalComponent = result.address_components?.find(c => c.types.includes("postal_code"));
              if (postalComponent) {
                postalCode = postalComponent.long_name;
                break;
              }
            }
            if (postalCode && !currentAddress.includes(postalCode)) {
              currentAddress = currentAddress + " - " + postalCode;
            }
            setAddress(currentAddress);
            if (inputRef.current) inputRef.current.value = currentAddress;
            checkDistance(currentAddress, latlng, postalCode);
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
    if (!isOpen || !mapsReady) return;
    const currentVal = inputRef.current?.value || addressRef.current || address;
    if (!currentVal) {
      setError('Please enter a delivery address.');
      return;
    }
    setLoading(true);
    setError('');

    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: currentVal }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          let currentAddress = results[0].formatted_address;
          let postalCode = "";
          for (const result of results) {
            const postalComponent = result.address_components?.find(c => c.types.includes("postal_code"));
            if (postalComponent) {
              postalCode = postalComponent.long_name;
              break;
            }
          }
          if (postalCode && !currentAddress.includes(postalCode)) {
            currentAddress = currentAddress + " - " + postalCode;
          }
          setAddress(currentAddress);
          if (inputRef.current) inputRef.current.value = currentAddress;
          checkDistance(currentAddress, results[0].geometry.location, postalCode);
        } else {
          // Fallback if geocoding fails
          checkDistance(currentVal);
        }
      });
    } else {
      checkDistance(currentVal);
    }
  };

  const handlePickupContinue = () => {
    const pickupInfo = {
      address: 'Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089',
      distance: 0,
      pincode: '400089',
      deliveryType: 'PICKUP'
    };
    sessionStorage.setItem('deliveryLocation', JSON.stringify(pickupInfo));
    onSuccess(pickupInfo);
  };

  if (!isOpen) return null;

  return (
    <>
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
        strategy="afterInteractive"
        onReady={() => {
          // Only set ready if the Places library has actually loaded.
          // With loading=async, onReady fires for the main script BEFORE
          // the Places library is available. The polling useEffect handles
          // the case where Places loads later.
          if (window.google?.maps?.places) {
            setMapsReady(true);
          }
        }}
      />
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
            {/* Delivery / Pickup Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: '#F0F0F0',
              borderRadius: '12px',
              padding: '4px',
              marginBottom: '20px',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => { setDeliveryType('DELIVERY'); setError(''); }}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: '9px', border: 'none',
                  cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  backgroundColor: deliveryType === 'DELIVERY' ? '#5A3424' : 'transparent',
                  color: deliveryType === 'DELIVERY' ? '#FFF' : '#888',
                  boxShadow: deliveryType === 'DELIVERY' ? '0 3px 10px rgba(90, 52, 36, 0.25)' : 'none',
                }}
              >
                🚚 Delivery
              </button>
              <button
                type="button"
                onClick={() => { setDeliveryType('PICKUP'); setError(''); }}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: '9px', border: 'none',
                  cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  backgroundColor: deliveryType === 'PICKUP' ? '#5A3424' : 'transparent',
                  color: deliveryType === 'PICKUP' ? '#FFF' : '#888',
                  boxShadow: deliveryType === 'PICKUP' ? '0 3px 10px rgba(90, 52, 36, 0.25)' : 'none',
                }}
              >
                🏪 Store Pickup
              </button>
            </div>

            {/* Delivery UI */}
            {isPickup ? (
              /* Pickup UI */
              <>
                <div style={{
                  backgroundColor: '#FDF9F7',
                  border: '1px solid #E8D8CE',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: '#5A3424', color: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', flexShrink: 0
                  }}>📍</div>
                  <div>
                    <p style={{ fontWeight: '700', color: '#5A3424', margin: '0 0 4px 0', fontSize: '0.95rem' }}>Pickup Location</p>
                    <p style={{ color: '#555', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Drushti Sai Pradnya, Tilak Nagar,<br />Mumbai 400089
                    </p>
                    <p style={{ color: '#999', margin: '6px 0 0 0', fontSize: '0.8rem' }}>
                      Please collect your order on the selected date.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePickupContinue}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#5A3424', color: '#FFF', fontWeight: 'bold', fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  CONTINUE
                </button>
              </>
            ) : (
              /* Delivery UI */
              <>
                <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '0.9rem' }}>
                  Please enter the exact drop location for a hassle free delivery experience
                </p>

                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for a building, street name, or area"
                    defaultValue={address}
                    onChange={(e) => { addressRef.current = e.target.value; setAddress(e.target.value); }}
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
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
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
                  disabled={loading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
                    backgroundColor: loading ? '#CCC' : '#5A3424', color: '#FFF', fontWeight: 'bold', fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Checking Distance...' : 'CONTINUE'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
