// src/socket.js
import {io} from 'socket.io-client';

// Ensure a single shared socket connection
const socket = io(`http://54.237.177.0:50000`);

export default socket;
