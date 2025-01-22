import React, { useState } from "react";
import AdRecommendations from "./components/AdRecommendations";
import MoviePlayback from "./components/MoviePlayback";

const App = () => {
  const [userID] = useState("demo_user"); // Default user ID
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger to refresh ads

  // Callback to handle playback completion
  const handlePlaybackComplete = () => {
    setRefreshTrigger((prev) => !prev); // Toggle trigger to refresh ads
  };

  return (
    <div>
      <h1>Ad Recommendation System</h1>

      {/* Movie Playback */}
      <MoviePlayback userID={userID} onPlaybackComplete={handlePlaybackComplete} />

      {/* Ad Recommendations */}
      <AdRecommendations userID={userID} triggerAdRefresh={refreshTrigger} />
    </div>
  );
};

export default App;
