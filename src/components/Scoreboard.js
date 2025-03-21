import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Scoreboard = () => {
    const { gameCode } = useParams();
    const [scoreboard, setScoreboard] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}`);
        setSocket(newSocket);

        // Fetch the initial scoreboard data from the server
        fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/scoreboard/${gameCode}`)
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

    // We only need the top 3 and the last player
    const filteredScoreboard = [...scoreboard].slice(0, 3); // Get the top 3 players
    const lastPlayer = scoreboard[scoreboard.length - 1]; // Get the last player

    // Adjusting font size and color based on the rank
    const getFontSizeClass = (rank) => {
        switch (rank) {
            case 1:
                return "text-4xl md:text-5xl"; // First place (largest)
            case 2:
                return "text-3xl md:text-4xl"; // Second place
            case 3:
                return "text-2xl md:text-3xl"; // Third place
            default:
                return "text-1xl md:text-2xl"; // Last place (smallest)
        }
    };

    const getColorClass = (rank) => {
        switch (rank) {
            case 1:
                return "bg-[#d4af37] text-white"; // First place - Gold color
            case 2:
                return "bg-[#c5c9c7] text-white"; // Second place - Silver color
            case 3:
                return "bg-[#a97142] text-white"; // Third place - Bronze color
            default:
                return "bg-[#1f262a] text-white"; // Last place - Gray color
        }
    };

    const groupedScoreboard = scoreboard.reduce((acc, player) => {
        if (!acc[player.score]) {
            acc[player.score] = [];
        }
        acc[player.score].push(player);
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-center bg-[#D680FF] bg-opacity-70 rounded-lg p-8 w-full max-w-3xl text-center space-y-6">
            <h1 className="font-august text-4xl md:text-5xl text-white">Scoreboard</h1>

            {/* Top 3 players */}
            {Object.keys(groupedScoreboard).sort((a, b) => b - a).map((score, index) => (
                <div key={score} className="mb-4">
                    {groupedScoreboard[score].map((player, playerIndex) => (
                        <div
                            key={player.name}
                            className={`font-bold ${getFontSizeClass(index + 1)} ${getColorClass(index + 1)} px-8 py-4 rounded-lg shadow-md`}
                        >
                            {index + 1}. {player.name} - {player.score} points
                        </div>
                    ))}
                </div>
            ))}

            {/* Last place */}
            {lastPlayer && (
                <div
                    key={lastPlayer.name}
                    className={`font-bold ${getFontSizeClass('last')} ${getColorClass('last')} px-8 py-4 rounded-lg shadow-md`}
                >
                    Last: {lastPlayer.name} - {lastPlayer.score} points
                </div>
            )}
        </div>
    );
};

export default Scoreboard;
