import { api } from "../api";

export interface ScoreBoardRow {
  nickname: string;
  kills: number;
  deaths: number;
  kd: number;
  score: number;
}

export interface Scoreboard {
  victory: boolean;
  teamA: ScoreBoardRow[];
  teamB: ScoreBoardRow[];
  qrcode: string;
}


export const playMatch = async () => {
  const { data } = await api.post<Scoreboard>('/play-match');
  return data;
};
