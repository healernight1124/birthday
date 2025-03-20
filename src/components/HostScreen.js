import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const HostScreen = () => {
    const [gameCode, setGameCode] = useState(Math.random().toString(36).substring(2, 8));
    const [playerCount, setPlayerCount] = useState(0);
    const [playersFinished, setPlayersFinished] = useState(0);
    const [socket, setSocket] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

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

    return (
        <div>
            <h1>Host Screen</h1>
            <p>Game Code: {gameCode}</p>
            <p>Players Joined: {playerCount}</p>
            <p>Players Finished: {playersFinished}</p>
            {!gameStarted && <button onClick={handleStartGame}>Start Game</button>}
        </div>
    );
};

export default HostScreen;
