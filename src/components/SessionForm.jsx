import React, { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation.js";

export default function SessionForm({ onSubmit, submitting }) {
  const { coords, error, loading, getPosition } = useGeolocation();
  const [radius, setRadius] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coords) return;
    onSubmit({
      centre_lat: coords.lat,
      centre_lng: coords.lng,
      radius_metres: Number(radius),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="panel space-y-5 max-w-md">
      <div>
        <p className="field-label">Classroom reference point</p>
        {!coords && (
          <button type="button" onClick={getPosition} disabled={loading} className="btn-secondary w-full">
            {loading ? "Reading device location…" : "Capture my current location"}
          </button>
        )}
        {coords && (
          <div className="text-sm text-navy-700 bg-navy-50 px-3 py-2 rounded-sm">
            Lat {coords.lat.toFixed(6)}, Lng {coords.lng.toFixed(6)}
            {coords.accuracy && ` — accuracy ±${Math.round(coords.accuracy)}m`}
            <button type="button" onClick={getPosition} className="ml-3 text-navy-600 underline underline-offset-2">
              recapture
            </button>
          </div>
        )}
        {error && <p className="text-sm text-rejected mt-1">{error}</p>}
      </div>

      <div>
        <label className="field-label" htmlFor="radius">Check-in radius: {radius} m</label>
        <input
          id="radius"
          type="range"
          min="5"
          max="10"
          step="1"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-navy-600 mt-1">
          <span>5 m</span>
          <span>10 m</span>
        </div>
      </div>

      <button type="submit" disabled={!coords || submitting} className="btn-primary w-full">
        {submitting ? "Starting session…" : "Start session"}
      </button>
    </form>
  );
}
