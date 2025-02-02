import React, { useState } from 'react';
import MoviePlayback from "./components/MoviePlayback";
import AdRecommendations from "./components/AdRecommendations";

function App() {
    const [recommendedAds, setRecommendedAds] = useState([]);

    // Function to handle playback simulation and fetch recommended ads
    const handlePlayback = async (userId, movieCategory) => {
        console.log(`Simulating playback for user: ${userId}, category: ${movieCategory}`);
        
        try {
            const response = await fetch('http://localhost:8082/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            setRecommendedAds(data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <h1>Movie Streaming Platform</h1>
            <MoviePlayback onPlayback={handlePlayback} />
            <AdRecommendations ads={recommendedAds} />
        </div>
    );
}

export default App;
