import React, { useState } from "react";
import axios from "axios";
import AdRecommendations from "./AdRecommendations"; // ✅ Import AdRecommendations

const MoviePlayback = () => {
  const [userID, setUserID] = useState("");
  const [movieCategory, setMovieCategory] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // ✅ New state to trigger refetch

  const handlePlaybackStart = async () => {
    if (!userID || !movieCategory) {
      alert("Please enter a User ID and select a movie category.");
      return;
    }

    setIsPlaying(true);
    setShowRecommendations(true);

    try {
      console.log("🟢 Sending playback request:", { userID, movieCategory });

      await axios.post("http://localhost:8082/playback", {
        user_id: userID,
        movie_category: movieCategory,
        timestamp: new Date().toISOString(),
      });

      console.log("✅ Playback recorded successfully.");

      // ✅ Trigger a refresh in AdRecommendations
      setRefreshTrigger((prev) => prev + 1);

    } catch (err) {
      console.error("❌ Failed to log playback:", err);
      alert("Error logging playback.");
    }
  };

  return (
    <div>
      <h2>Simulate Movie Playback</h2>
      <label>User ID:</label>
      <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} />

      <label>Select Movie Category:</label>
      <select value={movieCategory} onChange={(e) => setMovieCategory(e.target.value)}>
        <option value="">Select a category</option>
        <option value="Tech">Tech</option>
        <option value="Action">Action</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Comedy">Comedy</option>
        <option value="Fitness">Fitness</option>
        <option value="Travel">Travel</option>
      </select>

      <button onClick={handlePlaybackStart}>Start Playback</button>

      {showRecommendations && <AdRecommendations userID={userID} refreshTrigger={refreshTrigger} />}
    </div>
  );
};

export default MoviePlayback;
