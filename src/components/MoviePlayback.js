import React, { useState } from "react";
import axios from "axios";

const MoviePlayback = ({ userID, onPlaybackComplete }) => {
  const [category, setCategory] = useState(""); // Selected category
  const [message, setMessage] = useState(""); // Success or error message

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if category is selected
    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    // Send playback data to the backend
    axios
      .post("http://localhost:8082/playback", { userID, category })
      .then((response) => {
        setMessage("Playback data submitted: " + response.data);
        onPlaybackComplete(); // Notify parent to refresh ads
      })
      .catch((error) => {
        setMessage("Playback submission failed. Please try again.");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Movie Playback Simulation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">--Select a Category--</option>
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Fitness">Fitness</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button type="submit">Simulate Playback</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default MoviePlayback;
