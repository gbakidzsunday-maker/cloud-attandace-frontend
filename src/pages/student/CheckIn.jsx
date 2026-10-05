import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { checkIn } from "../../api/client.js";
import CheckInButton from "../../components/CheckInButton.jsx";

export default function CheckIn() {
  const { sessionId } = useParams();
  const { coords, error: geoError, loading: locating, getPosition } = useGeolocation();
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handlePress = () => {
    setApiError("");
    setResult(null);
    getPosition();
  };

  useEffect(() => {
    if (!coords) return;
    (async () => {
      setSubmitting(true);
      try {
        const data = await checkIn({
          session_id: sessionId,
          submitted_lat: coords.lat,
          submitted_lng: coords.lng,
        });
        setResult(data);
      } catch (err) {
        setApiError(err.response?.data?.detail || "Could not submit your check-in. Try again.");
      } finally {
        setSubmitting(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <div className="max-w-md mx-auto px-6 py-14 text-center">
      <h2 className="text-2xl mb-2">Mark Attendance</h2>
      <p className="text-sm text-navy-600 mb-10">
        Tap the button below. We'll use your device's location to confirm
        you're in the classroom.
      </p>

      <CheckInButton onPress={handlePress} loading={locating || submitting} disabled={!!result} />

      {geoError && <p className="text-sm text-rejected mt-6">{geoError}</p>}
      {apiError && <p className="text-sm text-rejected mt-6">{apiError}</p>}

      {result && (
        <div className={`mt-10 panel text-left ${result.status === "PRESENT" ? "border-present" : "border-rejected"}`}>
          <p className={`font-display text-xl ${result.status === "PRESENT" ? "text-present" : "text-rejected"}`}>
            {result.status === "PRESENT" ? "You're marked present" : "Check-in rejected"}
          </p>
          <p className="text-sm text-navy-700 mt-1">
            Distance from classroom reference point: {result.distance_metres.toFixed(1)} m
          </p>
          {result.status !== "PRESENT" && (
            <p className="text-sm text-navy-600 mt-2">
              You appear to be outside the check-in radius. Move closer to the
              lecturer and try again before the session closes.
            </p>
          )}
        </div>
      )}

      <Link to="/sessions" className="block mt-8 text-sm text-navy-600 underline underline-offset-2">
        Back to sessions
      </Link>
    </div>
  );
}
