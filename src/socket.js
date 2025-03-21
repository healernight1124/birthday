// src/socket.js
import { io } from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io('http://localhost:3000');

export default socket;
