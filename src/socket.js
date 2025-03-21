// src/socket.js
import {io} from 'socket.io-client';

const initSocket = () => {
    const response = fetch(`/api/config`);
    const data = response.json();
    return io(`${process.env.REACT_APP_URL}:${data.port}`);
};

// Ensure a single shared socket connection
const socket = initSocket();

export default socket;
