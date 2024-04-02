export interface PlayerProps {
    player: {
      id: number;
      headshot: string;
      firstName: {
        default: string;
      };
      lastName: {
        default: string;
      };
      sweaterNumber: number;
      positionCode: string;
      shootsCatches: string;
      heightInCentimeters: number;
      weightInKilograms: number;
      birthDate: string;
      birthCountry: string;
      birthStateProvince?: {
        default: string;
      };
    };
}
  
export const Player: React.FC<PlayerProps> = ({ player }) => {


    return (
      <div className="player">
        <img src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default}`} />
        <h3>{player.firstName.default} {player.lastName.default}</h3>
        <p>Number: {player.sweaterNumber}</p>
        <p>Position: {player.positionCode}</p>
        <p>Shoots: {player.shootsCatches}</p>
        <p>Height: {player.heightInCentimeters} cm</p>
        <p>Weight: {player.weightInKilograms} kg</p>
        <p>Birthdate: {player.birthDate}</p>
        <p>Birthplace: {player.birthStateProvince ? `, ${player.birthStateProvince.default}` : ''}, {player.birthCountry}</p>
      </div>
    );
};
  
export default Player;
  