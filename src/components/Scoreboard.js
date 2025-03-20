import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Scoreboard = () => {
    const { gameCode } = useParams();
    const [scoreboard, setScoreboard] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        // Fetch the initial scoreboard data from the server
        fetch(`http://localhost:3000/scoreboard/${gameCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setScoreboard(data.sort((a, b) => b.score - a.score))) // Sort the scoreboard by score, descending
            .catch(error => console.error('Error fetching scoreboard:', error));

        // Listen for the updateScoreboard event to update the scoreboard in real-time
        newSocket.on('updateScoreboard', ({ name, score }) => {
            setScoreboard((prevScoreboard) => {
                const updatedScoreboard = [...prevScoreboard];
                const playerIndex = updatedScoreboard.findIndex(player => player.name === name);
                if (playerIndex !== -1) {
                    updatedScoreboard[playerIndex].score = score;
                } else {
                    updatedScoreboard.push({ name, score });
                }
                return updatedScoreboard.sort((a, b) => b.score - a.score); // Sort the scoreboard by score, descending
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, [gameCode]);

    return (
        <div>
            <h1>Scoreboard</h1>
            <ul>
                {scoreboard.map((player, index) => (
                    <li key={index}>
                        {index + 1}. {player.name} - {player.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;