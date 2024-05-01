import { useDashboard } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';


const GameInfo = () => {
    const { data, loading, error } = useDashboard();
    const navigate = useNavigate();

    if (loading) return <div>Loading game information...</div>;
    if (error) return <div>Error loading data: {error}</div>;
    if (data.gameData.games.length === 0) return <div>No game information available.</div>;
    console.log(data.gameData);


    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1>Game Information</h1>
            {data.gameData.games.map(game => (
                <div key={game.id} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h2>{game.awayTeam.name.default} at {game.homeTeam.name.default}</h2>
                    <p>Date: {game.gameDate}</p>
                    <p>Venue: {game.venue.default}</p>
                    {game.seriesStatus && (
                        <>
                            {game.seriesStatus.round && <p>PlayOff Round: {game.seriesStatus.round}</p>}
                            {game.seriesStatus.topSeedWins !== undefined && game.seriesStatus.bottomSeedWins !== undefined && (
                                <p>Series Status: {game.seriesStatus.topSeedWins} : {game.seriesStatus.bottomSeedWins}</p>
                            )}
                            {game.seriesStatus.gameNumberOfSeries && <p>Game Number: {game.seriesStatus.gameNumberOfSeries}</p>}
                        </>
                    )}
                    <p>
                        <a href={game.ticketsLink} target="_blank" rel="noopener noreferrer">Tickets</a>
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>{game.awayTeam.name.default}</h3>
                            <img src={game.awayTeam.logo} alt={`Logo of ${game.awayTeam.name.default}`} style={{ width: '100px' }} />
                            <p>Record: {game.awayTeam.record}</p>
                        </div>
                        <div>
                            <h3>{game.homeTeam.name.default}</h3>
                            <img src={game.homeTeam.logo} alt={`Logo of ${game.homeTeam.name.default}`} style={{ width: '100px' }} />
                            <p>Record: {game.homeTeam.record}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameInfo;
