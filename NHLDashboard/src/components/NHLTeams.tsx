import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TeamCard from './Team';
import { useDashboard } from '../Provider/NHLContext';
import '../index.css';
import styles from './Team.module.css';

export const NHLTeams = () => {
    const { data, loading, error } = useDashboard();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [foundTeamId, setFoundTeamId] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const foundTeam = data.teams.data.find(team => 
            team.teamFullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (foundTeam) {
            setFoundTeamId(`team-${foundTeam.teamFullName.toLowerCase().replace(/ /g, '-')}`);
        }
    };

    useEffect(() => {
        if (foundTeamId) {
            const element = document.getElementById(foundTeamId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [foundTeamId]);

    if (loading) return <div>Načítání...</div>;
    if (error) return <div>Chyba: {error}</div>;

    return (
        <div className={styles.teamWrapper}>
            <button onClick={() => navigate('/Dashboard')} className='btnBack'>Go Back</button>
            <h1 className={styles.wrapper__title}>NHL TEAMS</h1>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Search for a team"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.btnSearch}>Search</button>
            </form>
            <div className={styles.wrapper__teamCard}>
                {data.teams.data.map(team => (
                    <div id={`team-${team.teamFullName.toLowerCase().replace(/ /g, '-')}`}>
                        <TeamCard key={team.teamId} team={{
                            teamFullName: team.teamFullName,
                            teamId: team.teamId,
                            triCode: data.teamAbbreviations.find(t => t.id === team.teamId)?.triCode || 'N/A'
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NHLTeams;
