import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';
import styles from '../CSSModules/Roster.module.css';

export const Roster = () => {
  const triCode = useParams<{ triCode: string }>().triCode!;
  const { data, loading } = useContext(DashboardContext);
  const navigate = useNavigate();

  const roster = data.rosters[triCode];

  const showPlayerDetails = (playerId: number) => {
    navigate(`/player-details/${playerId}`);
  };

  if (loading) return <div className='loading'>Loading roster...</div >;
  if (!roster) return <div className='loading'>No roster available</div >;

  return (
    <div className={styles.rosterWrapper}>
      <button className='btnBack' onClick={() => navigate('/team-roster')}>Go Back</button>
      <img className={styles.rosterWrapper__logo} src={`https://assets.nhle.com/logos/nhl/svg/${triCode}_light.svg`} alt={'Logo týmu'} />
      <h1 className={styles.rosterWrapper_titleMain}>roster for {triCode}</h1>
      <h2 className={styles.rosterWrapper_title}>Forwards</h2>
      <div className={styles.rosterWrapper__container}>
        {roster.forwards.map(player => (
          <div className={styles.rosterWrapper__playerCard} key={player.id} onClick={() => showPlayerDetails(player.id)}>
            <p className={styles['rosterWrapper__playerCard-player']}>{player.lastName.default}</p>
            <p className={styles['rosterWrapper__playerCard-playerNum']}>{player.sweaterNumber}</p>
            <img className={styles['rosterWrapper__playerCard-img']} src={player.headshot} alt={`${player.lastName.default} headshot`} />
          </div>
        ))}
      </div>
      <h2 className={styles.rosterWrapper_title}>Defensemen</h2>
      <div className={styles.rosterWrapper__container}>
        {roster.defensemen.map(player => (
          <div className={styles.rosterWrapper__playerCard} key={player.id} onClick={() => showPlayerDetails(player.id)}>
            <p className={styles['rosterWrapper__playerCard-player']}>{player.lastName.default}</p>
            <p className={styles['rosterWrapper__playerCard-playerNum']}>{player.sweaterNumber}</p>
            <img className={styles['rosterWrapper__playerCard-img']} src={player.headshot} alt={`${player.lastName.default} headshot`} />
          </div>
        ))}
      </div>
      <h2 className={styles.rosterWrapper_title}>Goalies</h2>
      <div className={styles.rosterWrapper__container}>
        {roster.goalies.map(player => (
          <div className={styles.rosterWrapper__playerCard} key={player.id} onClick={() => showPlayerDetails(player.id)}>
            <p className={styles['rosterWrapper__playerCard-player']}>{player.lastName.default}</p>
            <p className={styles['rosterWrapper__playerCard-playerNum']}>{player.sweaterNumber}</p>
            <img className={styles['rosterWrapper__playerCard-img']} src={player.headshot} alt={`${player.lastName.default} headshot`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;
