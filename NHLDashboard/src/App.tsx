import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NHLTeams from './components/NHLTeams';
import TeamDetails from './components/TeamDetails'; // Předpokládám, že komponenta už existuje
import TeamForRoster from './components/TeamForRoster';
import GoalieLeaders from './components/GoalieLeaders';
import SkaterLeaders from './components/SkaterLeaders';
import Schedule from './components/Schedule';
import Roster from './components/Roster'
import Standings from './components/Standings';
import MainPage from './components/MainPage';
import PlayerStats from './components/PlayerStats';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nhl-teams" element={<NHLTeams />} />
        <Route path="/nhl-teams/:teamId" element={<TeamDetails />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/skater-leaders" element={<SkaterLeaders />} />
        <Route path="/goalie-leaders" element={<GoalieLeaders />} />
        <Route path="/team-roster" element={<TeamForRoster />} />
        <Route path="/game-information" element={<h2>Informace o hře</h2>} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/league-schedule" element={<Schedule />} />
        <Route path="/nhl-teams/:teamId/roster" element={<Roster />} />

      </Routes>
    </Router>
  );
};

export default App;
