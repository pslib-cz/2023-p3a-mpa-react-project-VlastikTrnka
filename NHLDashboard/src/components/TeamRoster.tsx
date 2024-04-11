// TeamRoster.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TeamProps {
    team: {
        teamFullName: string;
        teamId: number;
    };
}

const TeamRoster: React.FC<TeamProps> = ({ team }) => {
  const navigate = useNavigate();

  const showRoster = () => {
    navigate(`/nhl-teams/${team.teamId}/roster`);
  };

  return (
    <div className="team-card" onClick={showRoster}>
      <h3>{team.teamFullName}</h3>
      <button onClick={showRoster}>Show team roster</button>
    </div>
  );
};

export default TeamRoster;
