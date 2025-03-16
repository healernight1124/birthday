// JoinScreen.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const JoinScreen = () => {
    const [name, setName] = useState('');
    const [gameCode, setGameCode] = useState('');
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('joinResponse', ({ valid }) => {
            if (valid) {
                console.log('Joined game successfully.');
            } else {
                alert('Invalid game code.');
            }
        });

        newSocket.on('startGame', () => {
            navigate('/game');
        });

        return () => newSocket.disconnect();
    }, [navigate]);

    const handleJoinGame = () => {
        if (socket) {
            socket.emit('join', { gameCode, name });
        }
    };

    return (
        <div>
            <h1>Join Game</h1>
            <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Game Code" value={gameCode} onChange={(e) => setGameCode(e.target.value)} />
            <button onClick={handleJoinGame}>Join</button>
        </div>
    );
};

export default JoinScreen;