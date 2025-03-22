// src/socket.js
import {io} from 'socket.io-client';

const SOCKET_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:10000'
    : `https://${window.location.hostname}`;

const socket = io(SOCKET_URL, {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    secure: true,
    rejectUnauthorized: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    withCredentials: true
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('connect', () => {
    console.log('Socket connected successfully');
});

export default socket;
