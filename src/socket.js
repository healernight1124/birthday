// src/socket.js
import {io} from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io(`http://${window.location.hostname}:50000`);

export default socket;
