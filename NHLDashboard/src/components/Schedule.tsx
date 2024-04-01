import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamInfo {
  id: number;
  placeName: {
    default: string;
  };
  abbrev: string;
  logo: string;
}

interface Game {
  id: number;
  startTimeUTC: string;
  venue: {
    default: string;
  };
  awayTeam: TeamInfo;
  homeTeam: TeamInfo;
}

export const Schedule: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = 'https://api-web.nhle.com/v1/schedule/now';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setGames(response.data);
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="schedule-container">
      <h1>Schedule</h1>
      <h3>National Hockey League</h3>
      <div className="games-list">
        {games.map((game) => (
          <div className="game-entry" key={game.id}>
            <div className="teams">
              <img className="team-logo" src={game.awayTeam.logo} alt={`${game.awayTeam.placeName.default} logo`} />
              <span className="vs">vs</span>
              <img className="team-logo" src={game.homeTeam.logo} alt={`${game.homeTeam.placeName.default} logo`} />
            </div>
            <div className="game-info">
              <span className="game-time">{formatDate(game.startTimeUTC)}</span>
              <span className="game-venue">{game.venue.default}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
