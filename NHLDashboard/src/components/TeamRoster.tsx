import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player, { PlayerProps } from './Player';

interface TeamRosterProps {
  forwards: PlayerProps['player'][];
}

export const TeamRoster: React.FC = () => {
  const [forwards, setForwards] = useState<TeamRosterProps['forwards']>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<{ forwards: TeamRosterProps['forwards'] }>('https://api-web.nhle.com/v1/roster/TOR/current')
      .then(response => {
        setForwards(response.data.forwards);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data: ", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="team-roster">
      <h2>Forwards Roster</h2>
      {forwards.map(player => <Player key={player.id} player={player} />)}
    </div>
  );
};

export default TeamRoster;
