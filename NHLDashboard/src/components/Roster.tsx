import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';

export const Roster = () => {
  const triCode = useParams<{ triCode: string }>().triCode!;
  const { data, loading } = useContext(DashboardContext);
  const navigate = useNavigate();

  const roster = data.rosters[triCode];

  const showPlayerDetails = (playerId: number) => {
    navigate(`/player-details/${playerId}`);
  };

  if (loading) return <p>Loading roster...</p>;
  if (!roster) return <p>No roster available</p>;

  return (
    <div>
      <button onClick={() => navigate('/team-roster')}>Go Back</button>
      <h1>Roster for {triCode}</h1>
      <h2>Forwards</h2>
      {roster.forwards.map(player => (
        <div key={player.id} onClick={() => showPlayerDetails(player.id)}>
          <p>{player.firstName.default} {player.lastName.default}</p>
          <img className="team-logo" src={player.headshot} alt={`${player.lastName.default} headshot`} />
        </div>
      ))}
      <h2>Defensemen</h2>
      {roster.defensemen.map(player => (
        <div key={player.id} onClick={() => showPlayerDetails(player.id)}>
          <p>{player.firstName.default} {player.lastName.default}</p>
          <img className="team-logo" src={player.headshot} alt={`${player.lastName.default} headshot`} />
        </div>
      ))}
      <h2>Goalies</h2>
      {roster.goalies.map(player => (
        <div key={player.id} onClick={() => showPlayerDetails(player.id)}>
          <p>{player.firstName.default} {player.lastName.default}</p>
          <img className="team-logo" src={player.headshot} alt={`${player.lastName.default} headshot`} />
        </div>
      ))}
    </div>
  );
};

export default Roster;
