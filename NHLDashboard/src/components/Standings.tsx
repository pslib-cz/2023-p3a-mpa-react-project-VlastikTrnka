import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamStanding {
    points: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    otLosses: number;
    regulationPlusOtWins: number;
    homeWins: number;
    homeLosses: number;
    homeOtLosses: number;
    roadWins: number;
    roadLosses: number;
    roadOtLosses: number;
    teamName: {
      default: string;
    };
    teamLogo: string;
  }

export const Standings: React.FC = () => {
    const [standings, setStandings] = useState<TeamStanding[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api-web.nhle.com/v1/standings/2024-04-01');
                setStandings(response.data.standings);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError('An error occurred while fetching the data: ' + error.message);
                } else {
                    setError('An unexpected error occurred');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="standings-container">
          <button className="back-button">Go Back</button>
          <h1 className="title">NHL Team Standings</h1>
          <div className="teams-list">
            {standings.map((team, index) => (
              <div className="team-entry" key={index}>
                <div className="team-rank">{index + 1}</div>
                <img className="team-logo" src={team.teamLogo} alt={`${team.teamName.default} logo`} />
                <div className="team-info">
                  <h2 className="team-name">{team.teamName.default}</h2>
                  <div className="team-stats">
                    <span className="team-stat">PT: {team.points}</span>
                    <span className="team-stat">GP: {team.gamesPlayed}</span>
                    <span className="team-stat">W: {team.wins}</span>
                    <span className="team-stat">L: {team.losses}</span>
                    <span className="team-stat">OT: {team.otLosses}</span>
                    <span className="team-stat">ROW: {team.regulationPlusOtWins}</span>
                  </div>
                </div>
                <div className="team-record">
                  <span className="record-home">HOME: {team.homeWins}-{team.homeLosses}-{team.homeOtLosses}</span>
                  <span className="record-away">AWAY: {team.roadWins}-{team.roadLosses}-{team.roadOtLosses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
      
};

export default Standings;
