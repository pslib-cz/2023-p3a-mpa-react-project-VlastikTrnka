import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../Provider/NHLContext';
import styles from '../CSSModules/Team.module.css';

interface TeamProps {
  team: {
    teamFullName: string;
    teamId: number;
    triCode: string;
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
    <div className={styles.TeamCard} onClick={showRoster}>
      <img className={styles.TeamCard__logo} src={`https://assets.nhle.com/logos/nhl/svg/${team.triCode}_light.svg`} alt={`Logo týmu ${team.teamFullName}`} />
      <h2 className={styles.TeamCard__title}>{team.teamFullName}</h2>
      <button onClick={showRoster}>Show Team Roster</button>
    </div>
  );
};

export default TeamRoster;
