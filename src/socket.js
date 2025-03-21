// src/socket.js
import { io } from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io('https://www.emily-quiz.it.com:50000');

export default socket;
