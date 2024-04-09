import React, { useContext } from 'react';
import { DashboardContext, useDashboard } from '../Provider/NHLContext'; // Make sure the path matches the location of your context file

export const NHLTeams: React.FC = () => {
    const { data, loading, error } = useDashboard();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Make sure to access the `data` property within `data.teams`
    return (
        <div>
            <h1>NHL Team Stats</h1>
            {data.teams.data.map((team) => ( // Access the nested `data` property
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
