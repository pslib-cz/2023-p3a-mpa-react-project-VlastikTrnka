// TeamForRoster.tsx
import React from 'react';
import { useDashboard } from '../Provider/NHLContext';
import TeamRoster from './TeamRoster';
import { useNavigate } from 'react-router-dom';

export const TeamForRoster: React.FC = () => {
  const { data, loading, error } = useDashboard();
  const navigate = useNavigate();

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error}</div>;

  return (
    <div>
      <button onClick={() => navigate('/player-stats')}>Go Back</button>
      <h1>Search for your player</h1>
      <div className="teams-grid">
        {data.teams.data.map(team => (
          <TeamRoster key={team.teamId} team={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamForRoster;
