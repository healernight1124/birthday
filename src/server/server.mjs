import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import portfinder from 'portfinder';

const app = express();

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
const io = new socketIo(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'ContentType', 'Accept'],
        credentials: true
    }
});

const activeGames = {};
let scoreboard = [];

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

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

    socket.on('join', ({ gameCode, name }) => {
        if (activeGames[gameCode]) {
            socket.join(gameCode);
            activeGames[gameCode].players += 1;
            scoreboard[gameCode].push({ name: name, score: 0 });
            console.log(`${name} joined game: ${gameCode}, scoreboard: ${JSON.stringify(scoreboard[gameCode])}`);
            socket.emit('joinResponse', { valid: true });
            updatePlayerCount(gameCode);
        } else {
            socket.emit('joinResponse', { valid: false });
        }
    });

    socket.on('startGame', ({ gameCode }) => {
        if (activeGames[gameCode]) {
            console.log(`Game started for: ${gameCode}`);
            io.to(gameCode).emit('startGame', {gameCode});
        }
    });

    socket.on('finishGame', ({ gameCode, name, score }) => {
        console.log(`Player ${name} finished with score: ${score}`);
        console.log(`Current scoreboard: ${JSON.stringify(scoreboard)}`);
        console.log(`Current gameCode: ${gameCode}`);

        if (!scoreboard[gameCode]) {
            console.error(`scoreboard[${gameCode}] is undefined`);
            return;
        }

        const playerIndex = scoreboard[gameCode].findIndex(player => player.name === name);
        if (playerIndex !== -1) {
            scoreboard[gameCode][playerIndex].score = score;
        } else {
            scoreboard[gameCode].push({ name, score });
        }
        io.to(gameCode).emit('updateScoreboard', { name, score });
    });

    socket.on('playerFinished', ({ gameCode }) => {
        console.log(`Player finished: ${socket.id}`);
        updatePlayersFinished(gameCode);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        for (const gameCode in activeGames) {
            if (io.sockets.adapter.rooms.get(gameCode)?.has(socket.id)) {
                activeGames[gameCode].players -= 1;
                updatePlayerCount(gameCode);
                if (activeGames[gameCode].players <= 0) {
                    delete activeGames[gameCode];
                    delete scoreboard[gameCode];
                }
                break;
            }
        }
    });

    function updatePlayerCount(gameCode) {
        const count = activeGames[gameCode]?.players || 0;
        console.log(`Updating player count for ${gameCode}: ${count}`);
        io.to(gameCode).emit('updatePlayerCount', { count });
    }

    function updatePlayersFinished(gameCode) {
        const finishedCount = 1;
        console.log(`Updating finished player count for ${gameCode}`);
        io.to(gameCode).emit('updatePlayersFinished', { count: finishedCount });
    }
});

app.get('/scoreboard/:gameCode', (req, res) => {
    const { gameCode } = req.params;
    if (scoreboard[gameCode]) {
        res.json(scoreboard[gameCode]);
    } else {
        res.status(404).json({ error: 'Game not found' });
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