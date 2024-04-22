import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';
import { Roster } from '../Provider/NHLContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    if (contextLoading || loading) return <div>Loading player details...</div>;
    if (!player) return <div>Player details not available</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <div>
                <h2>{player.firstName.default} {player.lastName.default}</h2>
            </div>
            <div>
                <h2>{player.sweaterNumber}</h2>
                <img src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default}`} />
            </div>
            <div>
                <p>Position: {player.positionCode}</p>
                <p>Date of Birth: {player.birthDate}</p>
                <p>Height: {player.heightInCentimeters} cm</p>
                <p>Weight: {player.weightInKilograms} kg</p>
                <p>Birth Country: {player.birthCountry}</p>
                <p>Shoots: {player.shootsCatches}</p>
            </div>
            <div>
                <button onClick={() => setSeasonType('regularSeason')}>Regular Season</button>
                <button onClick={() => setSeasonType('playoffs')}>Playoffs</button>
                <h3>Stats for {seasonType}:</h3>
                <p>Games Played: {playerDetails?.careerTotals[seasonType].gamesPlayed}</p>
                <p>Goals: {playerDetails?.careerTotals[seasonType].goals}</p>
                <p>Assists: {playerDetails?.careerTotals[seasonType].assists}</p>
                <p>Points: {playerDetails?.careerTotals[seasonType].points}</p>
                <p>Power Play Goals: {playerDetails?.careerTotals[seasonType].powerPlayGoals}</p>
                <p>Power Play Points: {playerDetails?.careerTotals[seasonType].powerPlayPoints}</p>
                <p>Shorthanded Points: {playerDetails?.careerTotals[seasonType].shorthandedPoints}</p>
                <p>Game Winning Goals: {playerDetails?.careerTotals[seasonType].gameWinningGoals}</p>
                <p>Shots: {playerDetails?.careerTotals[seasonType].shots}</p>
                <p>Faceoff Winning Percentage: {
                playerDetails?.careerTotals[seasonType].faceoffWinningPctg 
                    ? (playerDetails.careerTotals[seasonType].faceoffWinningPctg * 100).toString() + '%'
                    : 'N/A'
                }</p>
                <p>Average Time on Ice: {
                playerDetails?.careerTotals[seasonType].avgToi || 'N/A'
                } minutes</p>
            </div>
        </div>
    );
};

export default PlayerDetails;
