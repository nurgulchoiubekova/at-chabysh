export type Difficulty = 'оңой' | 'орто' | 'татаал';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  difficulty: Difficulty;
}

export interface Player {
  id: number;
  name: string;
  position: number; // 0 to 100
  score: number;
  color: string;
}

export type GameStatus = 'start' | 'playing' | 'finished';
