import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostScreen from './components/HostScreen';
import JoinScreen from './components/JoinScreen';
import GameScreen from './components/GameScreen';
import ThankYou from './components/ThankYou';
import Scoreboard from "./components/Scoreboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HostScreen />} />
                <Route path="/join" element={<JoinScreen />} />
                <Route path="/game/:gameCode" element={<GameScreen />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
            </Routes>
        </Router>
    );
}

export default App;