import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__logo}>0</div>
      <h1 className={styles.dashboard__title}>NHL DASHBOARD</h1>
      <div className={styles.dashboard__menu}>
        <Link to="/nhl-teams" className={styles['dashboard__menu-item']}>
          Teams Information
        </Link>
        <Link to="/player-stats" className={styles['dashboard__menu-item']}>
          Player Stats
        </Link>
        <Link to="/game-info" className={styles['dashboard__menu-item']}>
          Game Information
        </Link>
        <Link to="/standings" className={styles['dashboard__menu-item']}>
          Standings
        </Link>
        <Link to="/league-schedule" className={styles['dashboard__menu-item']}>
          League Schedule
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
