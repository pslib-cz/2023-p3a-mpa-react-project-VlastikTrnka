import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';
import '../index.css';
import styles from '../CSSModules/TeamDetails.module.css';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useContext(DashboardContext);
  const navigate = useNavigate();
  const team = data.teams.data.find(t => t.teamId === Number(teamId));

  if (!team) {
    return <div className='loading'>Team not found</div>;
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
          <div className={styles['Card2__Main']}>
            <p className={styles['Card2__Main-text']}><strong className={styles['Main__textHead-mid']}>{team.wins}</strong><br />Wins</p>
            <p className={styles['Card2__Main-text']}><strong className={styles['Main__textHead-big']}>{team.points}</strong><br />Points</p>
            <p className={styles['Card2__Main-text']}><strong className={styles['Main__textHead-mid']}>{team.losses}</strong><br />Losses</p>
          </div>

          <div className={styles['Card2__subMain']}>
            <p className={styles['Card2__subMain-text']}><strong className={styles['subMain__text-mid']}>{team.goalsForPerGame.toFixed(1)}</strong><br />Goals Per Game</p>
            <p className={styles['Card2__subMain-text']}><strong className={styles['subMain__text-big']}>{team.goalsFor}</strong><br />Goals</p>
            <p className={styles['Card2__subMain-text']}><strong className={styles['subMain__text-big']}>{team.gamesPlayed}</strong><br />Games Played</p>
            <p className={styles['Card2__subMain-text']}><strong className={styles['subMain__text-mid']}>{team.shotsForPerGame.toFixed(1)}</strong><br />Shots Per Game</p>
          </div>
          
          <div className={styles['Card2__subsubMain']}>
            <p className={styles['Card2__subsubMain-text']}><strong className={styles['subsubMain__text-mid']}>{team.winsInRegulation}</strong><br />Wins in Regulation</p>
            <p className={styles['Card2__subsubMain-text']}><strong className={styles['subsubMain__text-mid']}>{team.winsInShootout}</strong><br />Wins in Shootout</p>
          </div>
        </div>
    </div>
  );
};

export default TeamDetails;
