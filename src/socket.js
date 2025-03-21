// src/socket.js
import { io } from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io('http://localhost:8080');

export default socket;
