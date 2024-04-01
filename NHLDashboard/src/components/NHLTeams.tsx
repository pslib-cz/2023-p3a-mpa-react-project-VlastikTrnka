import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamStats {
    teamFullName: string;
    teamId: number;
    gamesPlayed: number;
    goalsFor: number;
    goalsForPerGame: number;
    losses: number;
    points: number;
    shotsForPerGame: number;
    wins: number;
    winsInRegulation: number;
    winsInShootout: number;
}

export const NHLTeams: React.FC = () => {
    const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<TeamStats[]>('https://api.nhle.com/stats/rest/en/team/summary?sort=points&cayenneExp=seasonId=20232024%20and%20gameTypeId=2');
                setTeamStats(response.data);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError('An error occurred while fetching the data.');
                } else {
                    setError('An unexpected error occurred.');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>NHL Team Stats</h1>
            {teamStats.map((team) => (
                <div key={team.teamId}>
                    <h2>{team.teamFullName}</h2>
                    <p>Games Played: {team.gamesPlayed}</p>
                    <p>Wins: {team.wins}</p>
                    <p>Losses: {team.losses}</p>
                    <p>Points: {team.points}</p>
                    <p>Goals For: {team.goalsFor}</p>
                    <p>Goals For Per Game: {team.goalsForPerGame}</p>
                    <p>Shots For Per Game: {team.shotsForPerGame}</p>
                    <p>Wins in Shootout: {team.winsInShootout}</p>
                    <p>Wins in Regulation: {team.winsInRegulation}</p>
                </div>
            ))}
        </div>
    );
};

export default NHLTeams;
