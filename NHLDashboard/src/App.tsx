import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NHLTeams from './components/NHLTeams';
import TeamRoster from './components/TeamRoster';
import Schedule from './components/Schedule';
import Standings from './components/Standings';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nhl-teams" element={<NHLTeams />} />
        <Route path="/player-stats" element={<TeamRoster />} />
        <Route path="/game-information" element={<h2>Game Information Page</h2>} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/league-schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
};

export default App;
