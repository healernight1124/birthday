import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostScreen from './components/HostScreen';
import JoinScreen from './components/JoinScreen';
import GameScreen from './components/GameScreen';
import ThankYou from './components/ThankYou';
import Scoreboard from "./components/Scoreboard";
import Welcome from "./components/Welcome";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/host" element={<HostScreen />} />
                <Route path="/join" element={<JoinScreen />} />
                <Route path="/game/:gameCode/:playerName" element={<GameScreen />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/scoreboard/:gameCode" element={<Scoreboard />} />
            </Routes>
        </Router>
    );
}

export default App;