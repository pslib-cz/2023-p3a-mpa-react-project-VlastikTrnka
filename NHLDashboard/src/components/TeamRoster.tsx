import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../Provider/NHLContext';

interface TeamProps {
  team: {
    teamFullName: string;
    teamId: number;
  };
}

const TeamRoster: React.FC<TeamProps> = ({ team }) => {
  const navigate = useNavigate();
  const { data } = useDashboard();

  const showRoster = () => {
    const teamAbbrev = data.teamAbbreviations.find(t => t.id === team.teamId)?.triCode;
    if (teamAbbrev) {
      navigate(`/roster/${teamAbbrev}`);
    } else {
      console.error('No abbreviation found for teamId:', team.teamId);
    }
  };

  console.log(data.rosters)
  console.log(data.teamAbbreviations)

  return (
    <div className="team-card" onClick={showRoster}>
      <h3>{team.teamFullName}</h3>
      <button onClick={showRoster}>Show Team Roster</button>
    </div>
  );
};

export default TeamRoster;
