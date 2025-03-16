// server.mjs
import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import portfinder from 'portfinder';

const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const server = http.createServer(app);
const io = new socketIo(server,{
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'ContentType', 'Accept'],
        credentails : true
    }
});

const activeGames = {}; // Store active game rooms and player counts
const scoreboard = {}; // Store scores for each game

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Create a new game
    socket.on('createGame', ({ gameCode }) => {
        if (!activeGames[gameCode]) {
            activeGames[gameCode] = { players: 0 };
            scoreboard[gameCode] = [];
            console.log(`Game created: ${gameCode}`);
            socket.join(gameCode);
            socket.emit('gameCreated', { success: true });
            updatePlayerCount(gameCode);
        } else {
            socket.emit('gameCreated', { success: false });
        }
    });

    // Player joins a game
    socket.on('join', ({ gameCode, name }) => {
        if (activeGames[gameCode]) {
            socket.join(gameCode);
            activeGames[gameCode].players += 1;
            console.log(`${name} joined game: ${gameCode}`);
            socket.emit('joinResponse', { valid: true });
            updatePlayerCount(gameCode);
        } else {
            socket.emit('joinResponse', { valid: false });
        }
    });

    // Start the game (only triggers on player screens)
    socket.on('startGame', ({ gameCode }) => {
        if (activeGames[gameCode]) {
            console.log(`Game started for: ${gameCode}`);
            io.to(gameCode).emit('startGame'); // Notify all players
        }
    });

    // Player finishes the game
    socket.on('finishGame', ({ gameCode, name, score }) => {
        if (scoreboard[gameCode]) {
            scoreboard[gameCode].push({ name, score });
            io.to(gameCode).emit('updateScoreboard', { name, score });
        }
    });

    // Player disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        for (const gameCode in activeGames) {
            if (io.sockets.adapter.rooms.get(gameCode)?.has(socket.id)) {
                activeGames[gameCode].players -= 1;
                updatePlayerCount(gameCode);
                if (activeGames[gameCode].players <= 0) {
                    delete activeGames[gameCode]; // Cleanup empty games
                    delete scoreboard[gameCode]; // Cleanup scoreboard
                }
                break;
            }
        }
    });

    // Helper: Update player count
    function updatePlayerCount(gameCode) {
        const count = activeGames[gameCode]?.players || 0;
        console.log(`Updating player count for ${gameCode}: ${count}`);
        io.to(gameCode).emit('updatePlayerCount', { count });
    }
});

const startServer = (port) => {
    server.listen(port, (err) => {
        if (err) {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Trying next port...`);
                portfinder.getPortPromise({ port: port + 1 })
                    .then((newPort) => {
                        startServer(newPort);
                    })
                    .catch((err) => {
                        console.error(`No available ports: ${err}`);
                        process.exit(1);
                    });
            } else {
                console.error(`Error starting server: ${err}`);
                process.exit(1);
            }
        } else {
            console.log(`Server running on port ${port}`);
        }
    });
};

const PORT = process.env.PORT || 3000;
startServer(PORT);