import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NHLTeams from './components/NHLTeams';
import TeamDetails from './components/TeamDetails';
import TeamForRoster from './components/TeamForRoster';
import GoalieLeaders from './components/GoalieLeaders';
import SkaterLeaders from './components/SkaterLeaders';
import Schedule from './components/Schedule';
import Roster from './components/Roster'
import Standings from './components/Standings';
import PlayerDetails from './components/PlayerDetails';
import GameInfo from './components/GameInfo';
import PlayerStats from './components/PlayerStats';
import './App.css';
import '../src/assets/fonts/fonts.css';


const App: React.FC = () => {
  return (

    <Router basename="/2023-p3a-mpa-react-project-VlastikTrnka">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nhl-teams" element={<NHLTeams />} />
        <Route path="/nhl-teams/:teamId" element={<TeamDetails />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/skater-leaders" element={<SkaterLeaders />} />
        <Route path="/goalie-leaders" element={<GoalieLeaders />} />
        <Route path="/team-roster" element={<TeamForRoster />} />
        <Route path="/game-info" element={<GameInfo/>} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/league-schedule" element={<Schedule />} />
        <Route path="/roster/:triCode" element={<Roster />} />
        <Route path="/player-details/:playerId" element={<PlayerDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
