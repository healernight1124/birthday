// HostScreen.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const HostScreen = () => {
    const [gameCode, setGameCode] = useState( Math.random().toString(36).substring(2, 8) );
    const [playerCount, setPlayerCount] = useState(0);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
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

        return () => newSocket.disconnect();
    }, [gameCode]);

    const handleStartGame = () => {
        if (socket) {
            socket.emit('startGame', { gameCode });
            alert('Game is starting!');
        }
    };

    return (
        <div>
            <h1>Host Screen</h1>
            <p>Game Code: {gameCode}</p>
            <p>Players Joined: {playerCount}</p>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

export default HostScreen;