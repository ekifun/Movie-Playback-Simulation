import React, { useState, useEffect } from "react";
import axios from "axios";

const AdRecommendations = ({ userID, triggerAdRefresh }) => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");

  // Fetch ads from the backend
  const fetchAds = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/recommend?userID=${userID}`);
      setAds(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError("Failed to fetch recommendations.");
    }
  };

  // Fetch ads when the component mounts or `triggerAdRefresh` changes
  useEffect(() => {
    fetchAds();
  }, [triggerAdRefresh, userID]);

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
