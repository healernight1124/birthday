// src/socket.js
import { io } from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}`);

export default socket;
