import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/Team.module.css';


interface Team {
    teamFullName: string;
    teamId: number;
    triCode: string;
}

const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/nhl-teams/${team.teamId}`);
  };

  return (
    <div className={styles.TeamCard}>
      <img className={styles.TeamCard__logo} src={`https://assets.nhle.com/logos/nhl/svg/${team.triCode}_light.svg`} alt={`Logo týmu ${team.teamFullName}`} />
      <h2 className={styles.TeamCard__title}>{team.teamFullName}</h2>
      <button onClick={showDetails}>Show details</button>
    </div>
  );
};

export default TeamCard;
