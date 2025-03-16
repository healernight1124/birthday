// App.js or Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostScreen from './components/HostScreen';
import JoinScreen from './components/JoinScreen';
import GameScreen from './components/GameScreen';
//import NextPage from './components/NextPage'; // Create this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HostScreen />} />
                <Route path="/join" element={<JoinScreen />} />
                <Route path="/game" element={<GameScreen />} />
                {/*<Route path="/next" element={<NextPage />} /> /!* The new route for /next *!/*/}
            </Routes>
        </Router>
    );
}

export default App;
