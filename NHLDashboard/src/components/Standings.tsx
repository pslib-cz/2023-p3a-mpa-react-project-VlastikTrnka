import React from 'react';
import { useDashboard } from '../Provider/NHLContext';

export const Standings: React.FC = () => {
    const { data: { standings }, loading, error } = useDashboard();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!standings.data || standings.data.length === 0) return <div>Nejsou dostupná žádná data o umístění týmů.</div>;

    return (
        <div className="standings-container">
          <button className="back-button">Go Back</button>
          <h1 className="title">NHL Team Standings</h1>
          <div className="teams-list">
            {standings.data.map((team, index) => (
              <div className="team-entry" key={index}>
                <div className="team-rank">{index + 1}</div>
                <img className="team-logo" src={team.teamLogo} alt={`${team.teamName.default} logo`} />
                <div className="team-info">
                  <h2 className="team-name">{team.teamName.default}</h2>
                  <div className="team-stats">
                    <span className="team-stat"> PT: {team.points}</span>
                    <span className="team-stat"> GP: {team.gamesPlayed}</span>
                    <span className="team-stat"> W: {team.wins}</span>
                    <span className="team-stat"> L: {team.losses}</span>
                    <span className="team-stat"> OT: {team.otLosses}</span>
                    <span className="team-stat"> ROW: {team.regulationPlusOtWins}</span>
                  </div>
                </div>
                <div className="team-record">
                  <span className="record-home"> HOME: {team.homeWins}-{team.homeLosses}-{team.homeOtLosses}</span>
                  <span className="record-away"> AWAY: {team.roadWins}-{team.roadLosses}-{team.roadOtLosses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default Standings;
