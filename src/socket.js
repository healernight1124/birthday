// src/socket.js
import {io} from 'socket.io-client';

const initSocket = async () => {
    try {
        const response = await fetch(`/api/config`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return io(`wss://${window.location.hostname}:${data.port}`);
    } catch (error) {
        console.error('Failed to initialize socket:', error);
        throw error;
    }
};

// Ensure a single shared socket connection
const socket = initSocket();

export default socket;
