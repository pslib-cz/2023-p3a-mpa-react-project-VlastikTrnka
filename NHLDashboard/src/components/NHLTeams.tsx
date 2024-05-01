
import { useNavigate } from 'react-router-dom';
import TeamCard from './Team';
import { useDashboard } from '../Provider/NHLContext';

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
                {data.teams.data.map(team => (
                    <TeamCard key={team.teamId} team={{
                        teamFullName: team.teamFullName,
                        teamId: team.teamId,
                        triCode: data.teamAbbreviations.find(t => t.id === team.teamId)?.triCode || 'N/A'
                    }} />
                ))}
            </div>
        </div>
    );
};

export default NHLTeams;
