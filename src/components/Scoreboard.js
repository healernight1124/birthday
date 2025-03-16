// Scoreboard.js
import React, { useState, useEffect } from 'react';
import socket from '../socket'; // Use shared socket instance

const Scoreboard = () => {
    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        // Listen for real-time scoreboard updates
        socket.on('updateScoreboard', (scoreData) => {
            setScoreboard((prev) => {
                const updatedScores = [...prev, scoreData];
                return updatedScores.sort((a, b) => b.score - a.score); // Sort by score descending
            });
        });

        // Cleanup on unmount
        return () => socket.off('updateScoreboard');
    }, []);

    return (
        <div>
            <h1>Scoreboard</h1>
            <ul>
                {scoreboard.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;