import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../Provider/NHLContext';
import '../index.css';
import styles from './Standings.module.css';

export const Standings: React.FC = () => {
    const { data: { standings }, loading, error } = useDashboard();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!standings.data || standings.data.length === 0) return <div>Nejsou dostupná žádná data o umístění týmů.</div>;

    return (
        <div className={styles.standingsWrapper}>
          <button className="btnBack" onClick={() => navigate('/Dashboard')}>Go Back</button>
          <h1 className={styles.standingsWrapper__title}>Standings</h1>
          <table className={styles.standingsTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>PT</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>OT</th>
                <th>ROW</th>
                <th>HOME</th>
                <th>AWAY</th>
              </tr>
            </thead>
            <tbody>
              {standings.data.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img className={styles.logo} src={team.teamLogo} alt={`${team.teamName.default} logo`} />{team.teamName.default}</td>
                  <td>{team.points}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.otLosses}</td>
                  <td>{team.regulationPlusOtWins}</td>
                  <td>{`${team.homeWins}-${team.homeLosses}-${team.homeOtLosses}`}</td>
                  <td>{`${team.roadWins}-${team.roadLosses}-${team.roadOtLosses}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
};

export default Standings;
