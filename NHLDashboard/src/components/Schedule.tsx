import React, { useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';

export const Schedule: React.FC = () => {
  const { data, loading, error } = useContext(DashboardContext);
  const navigate = useNavigate();

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

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error}</div>;

  return (
    <div className="schedule-container">
      <button className="back-button" onClick={() => navigate('/Dashboard')}>Go Back</button>
      <h1>Rozpis</h1>
      <h3>Národní hokejová liga</h3>
      <div className="games-list">
        {data.schedule.gameWeek.map((week) =>
          week.games.map((game) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;
