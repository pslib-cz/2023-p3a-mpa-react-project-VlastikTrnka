import { useDashboard } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import styles from '../CSSModules/GameInfo.module.css';

const GameInfo = () => {
    const { data, loading, error } = useDashboard();
    const navigate = useNavigate();

    if (loading) return <div className='loading'>Loading game information...</div>;
    if (error) return <div className='loading'>Error loading data: {error}</div>;
    if (data.gameData.games.length === 0) return <div>No game information available.</div>;
    console.log(data.gameData);


    return (
        <div className={styles.gameInfoWrapper}>
            <button className='btnBack' onClick={() => navigate(-1)}>Go Back</button>
            <h1 className={styles.gameInfoWrapper__title}>GAME INFORMATION</h1>
            {data.gameData.games.map(game => (
                <div className={styles.wrapper__box} key={game.id}>
                    <h2 className={styles['wrapper__card-title']}>{game.awayTeam.name.default} at {game.homeTeam.name.default}</h2>
                    <div className={styles.wrapper__card}>
                        <div className={styles.wrapper__cardText}>
                            <p className={styles['wrapper__card-text']}>Date: {game.gameDate}</p>
                            <p className={styles['wrapper__card-text']}>Venue: {game.venue.default}</p>
                            {game.seriesStatus && (
                                <>
                                    {game.seriesStatus.round && <p className={styles['wrapper__card-text']}>PlayOff Round: {game.seriesStatus.round}</p>}
                                    {game.seriesStatus.topSeedWins !== undefined && game.seriesStatus.bottomSeedWins !== undefined && (
                                        <p className={styles['wrapper__card-text']}>Series Status: {game.seriesStatus.topSeedWins} : {game.seriesStatus.bottomSeedWins}</p>
                                    )}
                                    {game.seriesStatus.gameNumberOfSeries && <p className={styles['wrapper__card-text']}>Game Number: {game.seriesStatus.gameNumberOfSeries}</p>}
                                </>
                            )}
                        </div>
                        <div className={styles.wrapper__teamCard}>
                            <div  className={styles.teamCard__left}>
                                <h2 className={styles['wrapper__teamCard-title']}>{game.awayTeam.name.default}</h2>
                                <img className={styles.teamCard__logo} src={game.awayTeam.logo} alt={`Logo of ${game.awayTeam.name.default}`} />
                                <p className={styles['wrapper__card-text']}>Record: {game.awayTeam.record}</p>
                            </div>
                            <div className={styles.teamCard__right}>
                                <h2 className={styles['wrapper__teamCard-title']}>{game.homeTeam.name.default}</h2>
                                <img className={styles.teamCard__logo} src={game.homeTeam.logo} alt={`Logo of ${game.homeTeam.name.default}`} />
                                <p className={styles['wrapper__card-text']}>Record: {game.homeTeam.record}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameInfo;
