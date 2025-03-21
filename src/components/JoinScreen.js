import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const JoinScreen = () => {
    const [name, setName] = useState('');
    const [gameCode, setGameCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}`);
        setSocket(newSocket);

        newSocket.on('joinResponse', ({ valid, nameExists }) => {
            if (valid && !nameExists) {
                console.log('Joined game successfully.');
                setHasJoined(true);
            } else if (!valid) {
                alert('Invalid game code.');
            } else if (nameExists) {
                alert('Name already exists in this game.');
            }
        });

        newSocket.on('startGame', ({ gameCode }) => {
            console.log(`Navigating to game ${gameCode} is starting! ${name} get ready!`);
            navigate(`/game/${gameCode}/${name}`);
        });

        return () => newSocket.disconnect();
    }, [navigate, name]);

    const handleJoinGame = () => {
        if (!name || !gameCode) {
            alert('Please enter your name and the game code.');
            return;
        }

        if (socket) {
            socket.emit('join', { gameCode, name });
            localStorage.setItem('playerName', name); // Store player name in local storage
        }
    };

    return (
        <div className="flex flex-col items-center bg-[#D680FF] bg-opacity-70 rounded-lg p-10 w-full max-w-3xl text-center space-y-8">
            <h1 className="font-august text-4xl md:text-6xl text-white">Spiel beitreten</h1>

            <input
                className="bg-white text-[#30193A] placeholder-black text-xl md:text-2xl px-6 py-3 rounded-lg w-full max-w-xs"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="bg-white text-[#30193A] placeholder-black text-xl md:text-2xl px-6 py-3 rounded-lg w-full max-w-xs"
                placeholder="Spiel Code"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
            />

            {!hasJoined && (
                <button
                    className="bg-[#D680FF] text-white text-lg md:text-xl px-6 py-3 rounded-lg opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={handleJoinGame}
                >
                    Beitreten
                </button>
            )}
        </div>

    );
};

export default JoinScreen;