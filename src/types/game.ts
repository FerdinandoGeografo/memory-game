export type GameTheme = "numbers" | "icons";
export type PlayerCount = "1" | "2" | "3" | "4";
export type GridSize = "4x4" | "6x6";

export type GameConfig = {
  theme: GameTheme;
  players: PlayerCount;
  gridSize: GridSize;
};

export type TileState = "covered" | "flipped" | "matched";

export interface Tile {
  id: number;
  value: number;
  state: TileState;
}

export interface Player {
  id: number;
  score: number;
}

export type GameStatus = "idle" | "playing" | "paused" | "finished";

export interface GameState {
  config: GameConfig;
  status: GameStatus;
  board: Tile[];
  players: Player[];
  currentPlayerIndex: number;
  isChecking: boolean;
  // Outcome of the last resolved pair in this round, for announcements
  lastMatch: boolean | null;
  moves: number;
  elapsedSeconds: number;
  roundId: number;
}

export type GameAction =
  | { type: "setConfig"; payload: Partial<GameConfig> }
  | { type: "start"; payload: { board: Tile[] } }
  | { type: "selectTile"; payload: { tileId: number } }
  | { type: "resolveMatch"; payload: { roundId: number } }
  | { type: "restart"; payload: { board: Tile[] } }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "tick" }
  | { type: "quit" };
