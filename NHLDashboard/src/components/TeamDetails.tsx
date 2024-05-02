import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useContext(DashboardContext);
  const navigate = useNavigate();
  const team = data.teams.data.find(t => t.teamId === Number(teamId));

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
        <button onClick={() => navigate('/nhl-teams')}>Go Back</button>
        <h2>{team.teamFullName}</h2>
        <p>Games Played: {team.gamesPlayed}</p>
        <p>Wins: {team.wins}</p>
        <p>Losses: {team.losses}</p>
        <p>Points: {team.points}</p>
        <p>Goals For: {team.goalsFor}</p>
        <p>Goals For Per Game: {team.goalsForPerGame}</p>
        <p>Shots For Per Game: {team.shotsForPerGame}</p>
        <p>Wins in Shootout: {team.winsInShootout}</p>
        <p>Wins in Regulation: {team.winsInRegulation}</p>
    </div>
  );
};

export default TeamDetails;
