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
        const newSocket = io('http://localhost:3000');
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
        }
    };

    return (
        <div>
            <h1>Join Game</h1>
            <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Game Code" value={gameCode} onChange={(e) => setGameCode(e.target.value)} />
            {!hasJoined && <button onClick={handleJoinGame}>Join</button>}
        </div>
    );
};

export default JoinScreen;