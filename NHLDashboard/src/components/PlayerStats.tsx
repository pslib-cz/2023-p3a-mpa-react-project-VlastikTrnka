import React from 'react';
import { Link } from 'react-router-dom';
import playerStyles from '../CSSModules/PlayerStats.module.css';
import { useNavigate } from 'react-router-dom';

const PlayerStats: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={playerStyles.dashboard}>
      <button onClick={() => navigate('/Dashboard')} className='btnBack'>Go Back</button>
      <h1 className={playerStyles.dashboard__title}>Player Stats</h1>
      <div className={playerStyles.dashboard__menu}>
        <Link to="/skater-leaders" className={playerStyles['dashboard__menu-item']}>
          Skater Leaders
        </Link>
        <Link to="/goalie-leaders" className={playerStyles['dashboard__menu-item']}>
          Goalie Leaders
        </Link>
        <Link to="/team-roster" className={playerStyles['dashboard__menu-item']}>
          Team Roster
        </Link>
      </div>
    </div>
  );
};

export default PlayerStats;
