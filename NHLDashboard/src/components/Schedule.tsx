import React, { useContext, useState } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import styles from './Schedule.module.css';

export const Schedule: React.FC = () => {
  const { data, loading, error } = useContext(DashboardContext);
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<string>('');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error}</div>;

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const gamesByDay = data.schedule.gameWeek.flatMap(week => week.games);

  const filteredGames = gamesByDay.filter(game => new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(game.startTimeUTC)).toUpperCase() === selectedDay);


  return (
    <div className={styles.scheduleWrapper}>
      <button className="btnBack" onClick={() => navigate('/Dashboard')}>Go Back</button>
      <h1>SCHEDULE</h1>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <button key={day} onClick={() => handleDayClick(day)} className={styles.dayButton}>
            {day}
          </button>
        ))}
      </div>
      <div className={styles.gameList}>
        {filteredGames.length > 0 ? filteredGames.map((game) => (
            <div className={styles.gameList__game} key={game.id}>
              <div className={styles['gameList__game-teams']}>
                <img className={styles.team__logoRight} src={game.awayTeam.logo} alt={`${game.awayTeam.placeName.default} logo`} />
              </div>
              <div className={styles.gameList__gameInfo}>
                <p className={styles['gameList__gameInfo-time']}>{formatDate(game.startTimeUTC)}</p>
                <div className={styles['gameInfo-vsBlock']}>
                  <p className={styles['gameInfo-vs']}>vs</p>
                </div>
                <p className={styles['gameList__gameInfo-venue']}>{game.venue.default}</p>
              </div>
              <div className={styles['gameList__game-teams']}>
                <img className={styles.team__logoLeft} src={game.homeTeam.logo} alt={`${game.homeTeam.placeName.default} logo`} />
              </div>
            </div>
        )) : <p className={styles.noGames}>No games on this day.</p>}
      </div>
    </div>
  );
};

export default Schedule;
