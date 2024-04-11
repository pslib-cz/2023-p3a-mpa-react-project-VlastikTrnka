import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const PlayerStats: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Link to="/Dashboard" className={styles.backButton}>
        &lt; Go Back
      </Link>
      <h1 className={styles.dashboardTitle}>Player Stats</h1>
      <div className={styles.dashboardMenu}>
        <Link to="/skater-leaders" className={styles.menuItem}>
          Skater Leaders
        </Link>
        <Link to="/goalie-leaders" className={styles.menuItem}>
          Goalie Leaders
        </Link>
        <Link to="/team-roster" className={styles.menuItem}>
          Team Roster
        </Link>
      </div>
    </div>
  );
};

export default PlayerStats;
