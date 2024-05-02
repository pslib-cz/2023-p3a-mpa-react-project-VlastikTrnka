import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';
import '../index.css';
import styles from './TeamDetails.module.css';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useContext(DashboardContext);
  const navigate = useNavigate();
  const team = data.teams.data.find(t => t.teamId === Number(teamId));

  if (!team) {
    return <div>Team not found</div>;
  }

  const triCode = data.teamAbbreviations.find(t => t.id === team.teamId)?.triCode || 'N/A';

  return (
    <div className={styles.teamDetailsWrapper}>
        <button  onClick={() => navigate('/nhl-teams')} className='btnBack'>Go Back</button>
        <div className={styles.teamDetails__Card}>
          <img className={styles.teamDetails__logo} src={`https://assets.nhle.com/logos/nhl/svg/${triCode}_light.svg`} alt={`Logo for ${team.teamFullName}`} />
          <h2 className={styles['teamDetails__Card-title']}>{team.teamFullName}</h2>
          <p className={styles['teamDetails__Card-text']}>2023/2024</p>
        </div>
        <div className={styles.teamDetails__Card2}>
          <p className={styles['teamDetails__Card2-text']}><strong>Games Played:</strong> {team.gamesPlayed}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Wins:</strong> {team.wins}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Losses:</strong> {team.losses}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Points:</strong> {team.points}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Goals For:</strong> {team.goalsFor}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Goals For Per Game:</strong> {team.goalsForPerGame.toFixed(1)}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Shots For Per Game:</strong> {team.shotsForPerGame.toFixed(1)}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Wins in Shootout:</strong> {team.winsInShootout}</p>
          <p className={styles['teamDetails__Card2-text']}><strong>Wins in Regulation:</strong> {team.winsInRegulation}</p>
        </div>
    </div>
  );
};

export default TeamDetails;
