"use client";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { use, useEffect, useState } from "react";

export default function TrackingScreen({ params }) {
  const { id } = use(params);
  const GOOGLE_MAPS_API_KEY = "AIzaSyDgjUUUQEOpXWQJP66xIe2fhtNUXmqYWLY";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [workerPos, setWorkerPos] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [directions, setDirections] = useState(null);
  const [travelInfo, setTravelInfo] = useState(null);
  const [initialDistance, setInitialDistance] = useState(null);

  // Customer location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude });
    });
  }, []);

  // Poll backend worker location
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const interval = setInterval(async () => {
      const res = await fetch(
        `https://mod2-backend.onrender.com/api/services/requests/${id}/track_worker/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setWorkerPos({
        lat: Number(data.worker.worker_profile.current_latitude),
        lng: Number(data.worker.worker_profile.current_longitude),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update route every time worker moves
  useEffect(() => {
    if (!workerPos || !userPos) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: workerPos,
        destination: userPos,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status !== "OK") return;

        setDirections(result);

        const leg = result.routes[0].legs[0];
        const remainingDistance = leg.distance.value; // meters

        // Set initial distance once
        setInitialDistance((prev) => prev ?? remainingDistance);

        const progress = initialDistance
          ? ((initialDistance - remainingDistance) / initialDistance) * 100
          : 0;

        setTravelInfo({
          distanceText: leg.distance.text,
          distanceValue: leg.distance.value, // meters
          durationText: leg.duration.text,
          durationValue: leg.duration.value, // seconds
          trafficDurationText:
            leg.duration_in_traffic?.text || leg.duration.text,
          progress: Math.max(0, Math.min(100, progress)), // clamp 0–100
        });
      }
    );
  }, [workerPos, userPos, initialDistance]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative w-full h-screen">
      {/* -------- Info Card (ETA + Distance + Progress) -------- */}
      <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-4 z-10">
        <h3 className="font-semibold text-lg mb-2">Journey Info</h3>

        {!!travelInfo ? (
          <>
            <p>
              <strong>Distance:</strong> {travelInfo.distanceText}
            </p>
            <p>
              <strong>Time Remaining:</strong> {travelInfo.durationText}
            </p>
            <p>
              <strong>Traffic ETA:</strong> {travelInfo.trafficDurationText}
            </p>
            <p>
              <strong>Progress:</strong> {travelInfo.progress.toFixed(1)}%
            </p>
          </>
        ) : (
          <p>Calculating route...</p>
        )}
      </div>

      {/* -------- Google Map -------- */}
      <GoogleMap
        center={userPos || { lat: 0, lng: 0 }}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {workerPos && <Marker position={workerPos} />}
        {userPos && <Marker position={userPos} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
