import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';
import { Roster } from '../Provider/NHLContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/PlayerDetails.module.css';
import stylesSide from '../CSSModules/Schedule.module.css';


interface PlayerAdditionalDetails {
    careerTotals: CareerTotals;
}

interface CareerTotals {
    regularSeason: SeasonStats,
    playoffs: SeasonStats
}

interface SeasonStats {
    gamesPlayed: number,
    goals: number,
    assists: number,
    points: number,
    powerPlayGoals: number,
    powerPlayPoints: number,
    shorthandedPoints: number,
    gameWinningGoals: number,
    shots: number,
    faceoffWinningPctg: number,
    avgToi: string
}

const PlayerDetails = () => {
    const { data, loading: contextLoading } = useContext(DashboardContext);
    const { playerId = '' } = useParams<{ playerId: string }>();
    const [playerDetails, setPlayerDetails] = useState<PlayerAdditionalDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [seasonType, setSeasonType] = useState<'regularSeason' | 'playoffs'>('regularSeason');
    const navigate = useNavigate();

    const numericPlayerId = parseInt(playerId, 10);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            setLoading(true);
            try {
                const proxyUrl = 'http://localhost:8080/';
                const response = await axios.get(`${proxyUrl}https://api-web.nhle.com/v1/player/${playerId}/landing`);
                setPlayerDetails(response.data);
            } catch (error) {
                console.error('Error fetching player details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (playerId) {
            fetchPlayerDetails();
        }
    }, [playerId]);

    if (!playerId) {
        return <div>Player ID is missing from the URL.</div>;
    }

    const findPlayerInRoster = (roster: Roster) => {
        return (
        roster.forwards.find(p => p.id === numericPlayerId) ||
        roster.defensemen.find(p => p.id === numericPlayerId) ||
        roster.goalies.find(p => p.id === numericPlayerId)
        );
    };

    let player;
    for (let rosterKey in data.rosters) {
        player = findPlayerInRoster(data.rosters[rosterKey]);
        if (player) break;
    }

    if (contextLoading || loading) return <div className='loading'>Loading player details...</div>;
    if (!player) return <div className='loading'>Player details not available</div>;

    return (
        <div className={styles.playerDetailsWrapper}>
            <button className='btnBack' onClick={() => navigate(-1)}>Go Back</button>
            <h2 className={styles.playerDetailsWrapper__playerName}>{player.firstName.default} <strong>{player.lastName.default}</strong></h2>
            <div className={styles.playerDetailsWrapper__box}>
                <div className={styles.playerDetailsWrapper__introduceCard}>
                    <p className={styles['playerDetailsWrapper__inroduceCard-num']}>{player.sweaterNumber}</p>
                    <img className={styles['playerDetailsWrapper__inroduceCard-logo']} src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default}`} />
                </div>
                <div className={styles.playerDetailsWrapper__infoCard}>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Position: {player.positionCode}</p>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Date of Birth: {player.birthDate}</p>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Height: {player.heightInCentimeters} cm</p>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Weight: {player.weightInKilograms} kg</p>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Birth Country: {player.birthCountry}</p>
                    <p className={styles['playerDetailsWrapper__infoCard-stat']}>Shoots: {player.shootsCatches}</p>
                </div>
                <div className={styles.playerDetailsWrapper__statsCard}>
                    <div className={styles.playerDetailsWrapper__statsCardBtn}>
                        <button
                            className={`${stylesSide.dayButton} ${seasonType === 'regularSeason' ? stylesSide.activeButton : ''}`}
                            onClick={() => setSeasonType('regularSeason')}
                        >
                            Regular Season
                        </button>
                        <button
                            className={`${stylesSide.dayButton} ${seasonType === 'playoffs' ? stylesSide.activeButton : ''}`}
                            onClick={() => setSeasonType('playoffs')}
                        >
                            Playoffs
                        </button>
                    </div>
                    <div className={styles.playerDetailsWrapper__statsCardValues}>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Games Played: {playerDetails?.careerTotals[seasonType].gamesPlayed}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Goals: {playerDetails?.careerTotals[seasonType].goals}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Assists: {playerDetails?.careerTotals[seasonType].assists}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Points: {playerDetails?.careerTotals[seasonType].points}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Power Play Goals: {playerDetails?.careerTotals[seasonType].powerPlayGoals}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Power Play Points: {playerDetails?.careerTotals[seasonType].powerPlayPoints}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Shorthanded Points: {playerDetails?.careerTotals[seasonType].shorthandedPoints}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Game Winning Goals: {playerDetails?.careerTotals[seasonType].gameWinningGoals}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Shots: {playerDetails?.careerTotals[seasonType].shots}</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Faceoff Winning Percentage: {
                        playerDetails?.careerTotals[seasonType].faceoffWinningPctg 
                            ? (playerDetails.careerTotals[seasonType].faceoffWinningPctg * 100).toString() + '%'
                            : 'N/A'
                        }</p>
                        <p className={styles['playerDetailsWrapper__statsCardValues-stat']}>Average Time on Ice: {
                        playerDetails?.careerTotals[seasonType].avgToi || 'N/A'
                        } minutes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerDetails;
