// Roster.tsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';

const Roster: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useContext(DashboardContext);

  const roster = data.players.filter(player => player.teamId === Number(teamId));

  return (
    <div>
      <h1>Soupiska</h1>
      {roster.map(player => (
        <div key={player.id}>
          <p>{player.firstName} {player.lastName}</p>
        </div>
      ))}
    </div>
  );
};

export default Roster;
