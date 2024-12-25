import React from "react";
import AdRecommendations from "./components/AdRecommendations";
import MoviePlayback from "./components/MoviePlayback";

const App = () => {
  return (
    <div>
      <h1>Ad Recommendation System</h1>
      <MoviePlayback />
      <AdRecommendations />
    </div>
  );
};

export default App;
