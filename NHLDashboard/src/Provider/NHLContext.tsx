import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import axios from 'axios';

// Definice rozhraní pro váš kontext
interface ContextProps {
  data: AllData;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

interface AllData {
    teams: TeamStats;
    players: PlayerStats[];
    standings: TeamStanding;
    schedule: ScheduleData;
}

interface TeamStats {
    data: Team[];
}

interface Team {
    teamFullName: string;
    teamId: number;
    gamesPlayed: number;
    goalsFor: number;
    goalsForPerGame: number;
    losses: number;
    points: number;
    shotsForPerGame: number;
    wins: number;
    winsInRegulation: number;
    winsInShootout: number;
}

interface PlayerStats {
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
}

interface TeamStanding {
    data: Standing[];
}

interface Standing {
    points: number;
    gamesPlayed: number;
    wins: number;
    losses: number;
    otLosses: number;
    regulationPlusOtWins: number;
    homeWins: number;
    homeLosses: number;
    homeOtLosses: number;
    roadWins: number;
    roadLosses: number;
    roadOtLosses: number;
    teamName: {
      default: string;
    };
    teamLogo: string;
}

  
interface ScheduleData {
    nextStartDate: string;
    previousStartDate: string;
    gameWeek: GameWeek[];
}

interface GameWeek {
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
    games: Game[];
}

interface Game {
    id: number;
    season: number;
    gameType: number;
    venue: { default: string };
    neutralSite: boolean;
    startTimeUTC: string;
    easternUTCOffset: string;
    venueUTCOffset: string;
    venueTimezone: string;
    gameState: string;
    gameScheduleState: string;
    tvBroadcasts: Array<{
        id: number;
        market: string;
        countryCode: string;
        network: string;
        sequenceNumber: number;
    }>;
    awayTeam: TeamInfo;
    homeTeam: TeamInfo;
}

interface TeamInfo {
    id: number;
    placeName: {
      default: string;
    };
    abbrev: string;
    logo: string;
}

export const DashboardContext = createContext<ContextProps>({
    data: {
        teams: { data: [] },
        players: [],
        standings: { data: []},
        schedule: { nextStartDate: '', previousStartDate: '', gameWeek: [] }
    },
    loading: true,
    error: null,
    fetchData: () => {},
  });
  
  // Komponenta poskytovatele
  export const DashboardProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [data, setData] = useState<AllData>({
        teams: { data: [] },
        players: [],
        standings: { data: []},
        schedule: { nextStartDate: '', previousStartDate: '', gameWeek: [] }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const proxyUrl = 'http://localhost:8080/';
        // Získání dat týmů
        const teamsResponse = await axios.get<{data: Team[]}>(`${proxyUrl}https://api.nhle.com/stats/rest/en/team/summary?sort=points&cayenneExp=seasonId=20232024%20and%20gameTypeId=2`);
        // Získání statistik hráčů (Příklad pro tým TOR, pokud potřebujete pro všechny týmy, musíte toto upravit)
        const playersResponse = await axios.get<PlayerStats[]>(`${proxyUrl}https://api-web.nhle.com/v1/roster/TOR/20232024`);
        // Získání tabulky
        const standingsResponse = await axios.get<{wildCardIndicator: boolean, standings: Standing[]}>(`${proxyUrl}https://api-web.nhle.com/v1/standings/now`);
        // Získání rozpisu
        const scheduleResponse = await axios.get<ScheduleData>(`${proxyUrl}https://api-web.nhle.com/v1/schedule/now`);
  
        setData({
            teams: teamsResponse.data,
            players: playersResponse.data,
            standings: { data: standingsResponse.data.standings },
            schedule: scheduleResponse.data
        });
  
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching the data.');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <DashboardContext.Provider value={{ data, loading, error, fetchData }}>
        {children}
      </DashboardContext.Provider>
    );
  };
  
  export const useDashboard = () => useContext(DashboardContext);
