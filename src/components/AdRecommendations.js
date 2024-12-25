import React, { useState, useEffect } from "react";
import axios from "axios";

const AdRecommendations = () => {
  const [userID, setUserID] = useState("demo_user"); // Default user ID
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");

  // Fetch Ads function
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

  useEffect(() => {
    fetchAds();
  }, [userID]);

  return (
    <div>
      <h2>Ad Recommendation System</h2>

      {/* User ID Input */}
      <div>
        <label htmlFor="userID">User ID:</label>
        <input
          type="text"
          id="userID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
        <button onClick={fetchAds}>Fetch Ads</button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Ads List */}
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
