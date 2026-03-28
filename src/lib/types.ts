export interface PlayerConfig {
  name: string;
  playerId: number;
  teamId: number;
}

export interface TeamConfig {
  teamName: string;
  ownerName: string;
  players: PlayerConfig[];
}

export interface TeamsData {
  teams: TeamConfig[];
}

export interface PlayerPoints {
  name: string;
  playerId: number;
  totalPoints: number;
  matchesPlayed: number;
}

export interface TeamStanding {
  teamName: string;
  ownerName: string;
  totalPoints: number;
  players: PlayerPoints[];
}

export interface FantasyApiResponse {
  Data: {
    Value: {
      Upcoming: FantasyMatch[] | null;
      Completed: FantasyMatch[] | null;
    };
  };
  Meta: {
    Success: boolean;
  };
}

export interface FantasyMatch {
  PlayerId: number;
  GameDaypoints: number;
  MatchName: string;
  MatchId: number;
  IsPlayed: number;
}

// Blob storage shape: { [playerId]: { [matchId]: points } }
export type StoredPoints = Record<string, Record<string, number>>;
