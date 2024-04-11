import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Link to="/" className={styles.backButton}>
        &lt; Go Back
      </Link>
      <h1 className={styles.dashboardTitle}>NHL Dashboard</h1>
      <div className={styles.dashboardMenu}>
        <Link to="/nhl-teams" className={styles.menuItem}>
          Teams Information
        </Link>
        <Link to="/player-stats" className={styles.menuItem}>
          Player Stats
        </Link>
        <Link to="/game-information" className={styles.menuItem}>
          Game Information
        </Link>
        <Link to="/standings" className={styles.menuItem}>
          Standings
        </Link>
        <Link to="/league-schedule" className={styles.menuItem}>
          League Schedule
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
