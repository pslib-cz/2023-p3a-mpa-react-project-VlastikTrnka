import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import axios from 'axios';

interface TeamAbbreviation {
  id: number;
  triCode: string;
}

export interface Roster {
  forwards: PlayerStats[];
  defensemen: PlayerStats[];
  goalies: PlayerStats[];
}

interface SkaterLeadersStats {
  id: number;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: {
    default: string;
  },
  teamLogo: string;
  position: string;
  value: number;
}

interface GoalieLeadersStats {
  id: number;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: {
    default: string;
  },
  teamLogo: string;
  value: number;
}

interface TopSkaters {
  points: SkaterLeadersStats[];
  assists: SkaterLeadersStats[];
  goals: SkaterLeadersStats[];
  toi: SkaterLeadersStats[];
  penaltyMins: SkaterLeadersStats[];
  faceoffLeaders: SkaterLeadersStats[];
}

interface TopGoalies {
  savePctg: GoalieLeadersStats[];
  shutouts: GoalieLeadersStats[];
  wins: GoalieLeadersStats[];
  goalsAgainstAverage: GoalieLeadersStats[];
}

interface ContextProps {
  data: AllData;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

interface AllData {
    teams: TeamStats;
    teamAbbreviations: TeamAbbreviation[];
    rosters: { [key: string]: Roster };
    topskaters: TopSkaters,
    topgoalies: TopGoalies,
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
        teamAbbreviations: [],
        rosters: {},
        topgoalies: { savePctg: [], shutouts: [], wins: [], goalsAgainstAverage: []},
        topskaters: { points: [], assists: [], goals: [], toi: [], penaltyMins: [], faceoffLeaders: []},
        standings: { data: []},
        schedule: { nextStartDate: '', previousStartDate: '', gameWeek: [] }
    },
    loading: true,
    error: null,
    fetchData: () => {},
  });

  export const DashboardProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [data, setData] = useState<AllData>({
        teams: { data: [] },
        teamAbbreviations: [],
        rosters: {},
        topgoalies: { savePctg: [], shutouts: [], wins: [], goalsAgainstAverage: []},
        topskaters: { points: [], assists: [], goals: [], toi: [], penaltyMins: [], faceoffLeaders: []},
        standings: { data: []},
        schedule: { nextStartDate: '', previousStartDate: '', gameWeek: [] }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const proxyUrl = 'http://localhost:8080/';
        
        const teamsResponse = await axios.get<{data: Team[]}>(`${proxyUrl}https://api.nhle.com/stats/rest/en/team/summary?sort=points&cayenneExp=seasonId=20232024%20and%20gameTypeId=2`);
        
        const teamAbbrevResponse = await axios.get<{data: TeamAbbreviation[]}>(`${proxyUrl}https://api.nhle.com/stats/rest/en/team`);

        const teamAbbreviationsMap: Record<string, string> = {};
        teamAbbrevResponse.data.data.forEach(team => {
          teamAbbreviationsMap[team.id.toString()] = team.triCode;
        });

        const rosters: Record<string, Roster> = {};
        await Promise.all(
          teamAbbrevResponse.data.data.map(async team => {
            try {
              const rosterResponse = await axios.get<Roster>(`${proxyUrl}https://api-web.nhle.com/v1/roster/${team.triCode}/20232024`);
              rosters[team.triCode] = rosterResponse.data;
            } catch (error) {
              console.error(`Failed to fetch roster for team ${team.triCode}:`, error);
            }
          })
        );

        const topSkatersResponse = await axios.get(`${proxyUrl}https://api-web.nhle.com/v1/skater-stats-leaders/20232024/2`);

        const topGoaliesResponse = await axios.get(`${proxyUrl}https://api-web.nhle.com/v1/goalie-stats-leaders/20232024/2`);
        
        const standingsResponse = await axios.get<{wildCardIndicator: boolean, standings: Standing[]}>(`${proxyUrl}https://api-web.nhle.com/v1/standings/now`);
        
        const scheduleResponse = await axios.get<ScheduleData>(`${proxyUrl}https://api-web.nhle.com/v1/schedule/now`);
  
        setData({
            teams: teamsResponse.data,
            rosters: rosters,
            teamAbbreviations: teamAbbrevResponse.data.data,
            topskaters: topSkatersResponse.data,
            topgoalies: topGoaliesResponse.data,
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
