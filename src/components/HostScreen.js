import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const HostScreen = () => {
    const [gameCode, setGameCode] = useState(Math.random().toString(36).substring(2, 8));
    const [playerCount, setPlayerCount] = useState(0);
    const [playersFinished, setPlayersFinished] = useState(0);
    const [socket, setSocket] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io('https://www.emily-quiz.it.com:50000');
        setSocket(newSocket);

        newSocket.emit('createGame', { gameCode });

        newSocket.on('gameCreated', ({ success }) => {
            if (success) {
                console.log('Game created successfully.');
            } else {
                alert('Game code already exists.');
            }
        });

        newSocket.on('updatePlayerCount', ({ count }) => {
            console.log('Player count updated:', count);
            setPlayerCount(count);
        });

        // Listening for the "updatePlayersFinished" event and updating state
        newSocket.on('updatePlayersFinished', ({ count }) => {
            setPlayersFinished(prevPlayersFinished => {
                const newCount = prevPlayersFinished + count;
                console.log('✅ Received updatePlayersFinished:', newCount);
                return newCount;
            });
        });

        return () => {
            newSocket.disconnect();
            newSocket.off('updatePlayersFinished'); // Clean up the event listener on unmount
        };
    }, [gameCode]);

    const handleStartGame = () => {
        if (socket) {
            socket.emit('startGame', { gameCode });
            alert('Game is starting!');
            setGameStarted(true);
        }
    };

    const handleViewScoreboard = () => {
        navigate(`/scoreboard/${gameCode}`);
    };

    return (
        <div className="flex flex-col items-center bg-[#D680FF] bg-opacity-70 rounded-lg p-8 w-full max-w-md text-center space-y-6">
            <h1 className="font-august text-6xl md:text-7xl">Host</h1>

            <div className="bg-white text-[#30193A] text-4xl md:text-5xl font-bold px-8 py-4 rounded-lg shadow-md">
                {gameCode}
            </div>

            <p className="text-2xl md:text-3xl">Spieler: {playerCount}</p>
            <p className="text-2xl md:text-3xl">Fertige Spieler: {playersFinished}</p>

            {!gameStarted && (
                <button
                    className="bg-[#D680FF] text-white text-lg md:text-xl px-6 py-3 rounded-lg opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={handleStartGame}
                >
                    Start Game
                </button>
            )}

            {gameStarted && (
                <button
                    className="bg-[#D680FF] text-white text-lg md:text-xl px-6 py-3 rounded-lg opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={handleViewScoreboard}
                >
                    Scoreboard
                </button>
            )}
        </div>
    );
};

export default HostScreen;
