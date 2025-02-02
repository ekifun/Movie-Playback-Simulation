import React, { useState, useEffect } from "react";
import axios from "axios";

const AdRecommendations = ({ userID, refreshTrigger }) => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");

  // Fetch recommendations from the backend
  const fetchRecommendations = async () => {
    if (!userID) return;

    console.log("🟢 Fetching recommendations for user:", userID);
    try {
      const response = await axios.post("http://localhost:8082/recommend", {
        user_id: userID,
      });

      console.log("✅ Recommended Ads Received:", response.data);
      setAds(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Failed to fetch recommendations:", err);
      setError("Failed to fetch recommendations.");
    }
  };

  // Refetch when `userID` or `refreshTrigger` changes
  useEffect(() => {
    fetchRecommendations();
  }, [userID, refreshTrigger]); // ✅ Ensures refetch on new playback

  return (
    <div>
      <h2>Recommended Ads</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {ads.length > 0 ? (
        <ul>
          {ads.map((ad) => (
            <li key={ad.ad_id}>
              <strong>{ad.category}:</strong> {ad.description}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No ads available for the current user profile.</p>
      )}
    </div>
  );
};

export default AdRecommendations;
