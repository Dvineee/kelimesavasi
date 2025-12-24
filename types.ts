
export enum GameState {
  LOGIN = 'LOGIN',
  LOBBY = 'LOBBY',
  MATCHMAKING = 'MATCHMAKING',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS'
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  score: number;
  level: number;
  isTyping: boolean;
  isReady: boolean;
  lastWord?: string;
}

export interface GameTurn {
  category: string;
  letter: string;
  timer: number;
  totalTime: number;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

export interface GameRoomData {
  id: string;
  name: string;
  playerCount: number;
  maxPlayers: number;
  isPrivate: boolean;
  owner: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  wins: number;
  gamesPlayed: number;
  totalPoints: number;
  league: 'Bronz' | 'Gümüş' | 'Altın' | 'Elmas';
}
