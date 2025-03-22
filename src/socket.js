// src/socket.js
import {io} from 'socket.io-client';

const SOCKET_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:50000'
    : `https://${window.location.hostname}`;

const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    secure: true,
    rejectUnauthorized: false,
    path: '/socket.io'
});

export default socket;
