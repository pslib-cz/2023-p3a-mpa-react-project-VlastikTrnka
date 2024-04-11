import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../Provider/NHLContext';

const Roster = () => {
  // Získáme triCode z URL, ne teamId
  const { triCode } = useParams<{ triCode: string }>();
  const { data, loading } = useContext(DashboardContext);
  
  console.log(triCode)

  // Získáme roster přímo pomocí triCode bez potřeby vyhledávat odpovídající teamId
  const roster = data.rosters[triCode];

  if (loading) return <div>Loading roster...</div>;
  if (!roster) return <div>No roster available</div>;

  return (
    <div>
      <h1>Roster for {triCode}</h1>
      {/* Zobrazíme seznam útočníků */}
      {roster.forwards.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
          {/* Zde můžete zobrazit více informací o hráči */}
        </div>
      ))}
      {/* Zopakujte pro obránce a brankáře */}
      {/* Doplněno zobrazení obránců a brankářů */}
      {roster.defensemen.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
        </div>
      ))}
      {roster.goalies.map(player => (
        <div key={player.id}>
          <p>{player.firstName.default} {player.lastName.default}</p>
        </div>
      ))}
    </div>
  );
};

export default Roster;
