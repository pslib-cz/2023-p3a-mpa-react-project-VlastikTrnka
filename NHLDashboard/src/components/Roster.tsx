import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';

const Roster = () => {
  const { triCode } = useParams<{ triCode: string }>();
  const { data, loading } = useContext(DashboardContext);
  const navigate = useNavigate();

  const roster = data.rosters[triCode];

  if (loading) return <div>Loading roster...</div>;
  if (!roster) return <div>No roster available</div>;

  return (
    <div>
      <button onClick={() => navigate('/team-roster')}>Go Back</button>
      <h1>Roster for {triCode}</h1>
      <h2>Forwards</h2>
      {roster.forwards.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
          <img className="team-logo" src={player.headshot} alt={`${player.lastName.default} logo`} />
        </div>
      ))}
      <h2>Defensemen</h2>
      {roster.defensemen.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
        </div>
      ))}
      <h2>Goalies</h2>
      {roster.goalies.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
        </div>
      ))}
    </div>
  );
};

export default Roster;
