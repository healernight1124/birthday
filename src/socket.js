// src/socket.js
import { io } from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io('https://emily-quiz-git-main-hetian-jiangs-projects.vercel.app:3000');

export default socket;
