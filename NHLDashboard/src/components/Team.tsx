import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Team {
    teamFullName: string;
    teamId: number;
}

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/nhl-teams/${team.teamId}`);
  };
  

  return (
    <div className="team-card" onClick={showDetails}>
      <h3>{team.teamFullName}</h3>
      <button onClick={showDetails}>Zobrazit detaily</button>
    </div>
  );
};

export default TeamCard;
