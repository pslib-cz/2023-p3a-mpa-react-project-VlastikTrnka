import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamInfo {
  id: number;
  name: string;
  venue: {
    name: string;
  };
  officialSiteUrl: string;
}

export const NHLTeams: React.FC = () => {
  const [teams, setTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nhle.com/stats/rest/en/team');
        setTeams(response.data.data);
      } catch (error) {
        console.error('Chyba při načítání dat o týmech NHL:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Týmy NHL</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <strong>{team.name}</strong> - Aréna: {team.venue.name} - <a href={team.officialSiteUrl}>Oficiální stránka</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NHLTeams;
