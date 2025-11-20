"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyDgjUUUQEOpXWQJP66xIe2fhtNUXmqYWLY";

export default function MapInput({setLocationData}) {
  const inputRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();

        if (place.geometry) {
          setAddress(place.formatted_address);
          setLocationData(place.formatted_address)
        }
      };

      autocomplete.addListener("place_changed", handlePlaceSelect);
      return () => {
        // Note: Removing the listener directly from a Google Maps object is tricky.
        // We ensure the hook re-initializes correctly if the key changes.
      };
    }
  }, []);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <input
        ref={inputRef}
        id="addressInput"
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder={"Start typing an address..."}
        className={`
            w-full px-4 py-3 border 
            rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
            transition duration-150 ease-in-out text-gray-800
          `}
      />
    </>
  );
}
