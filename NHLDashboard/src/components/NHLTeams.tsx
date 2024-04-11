import React from 'react';
import { useDashboard } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import Team from './Team';

export const NHLTeams = () => {
    const { data, loading, error } = useDashboard();
    const navigate = useNavigate();

    if (loading) return <div>Načítání...</div>;
    if (error) return <div>Chyba: {error}</div>;

    return (
        <div>
            <button onClick={() => navigate('/Dashboard')}>Go Back</button>
            <h1>NHL Týmy</h1>
            <div className="teams-grid">
                {data.teams.data.map((team) => (
                    <Team key={team.teamId} team={team} />
                ))}
            </div>
        </div>
    );
};

export default NHLTeams;
