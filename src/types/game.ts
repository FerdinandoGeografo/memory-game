export type GameTheme = "numbers" | "icons";
export type PlayerCount = "1" | "2" | "3" | "4";
export type GridSize = "4x4" | "6x6";

export type GameConfig = {
  theme: GameTheme;
  players: PlayerCount;
  gridSize: GridSize;
};

export type TileState = "covered" | "flipped" | "matched";

export type Tile = {
  id: number;
  value: number;
  state: TileState;
};

export type Player = {
  id: number;
  score: number;
};

export type GameStatus = "idle" | "playing" | "paused" | "finished";

export type GameState = {
  config: GameConfig;
  status: GameStatus;
  board: Tile[];
  players: Player[];
  currentPlayerIndex: number;
  isChecking: boolean;
  lastMatch: boolean | null;
  moves: number;
  elapsedMs: number;
  runningSince: number | null;
  roundId: number;
};

export type GameAction =
  | { type: "setConfig"; payload: Partial<GameConfig> }
  | { type: "start"; payload: { board: Tile[]; now: number } }
  | { type: "selectTile"; payload: { tileId: number } }
  | { type: "resolveMatch"; payload: { roundId: number; now: number } }
  | { type: "restart"; payload: { board: Tile[]; now: number } }
  | { type: "pause"; payload: { now: number } }
  | { type: "resume"; payload: { now: number } }
  | { type: "tick"; payload: { now: number } }
  | { type: "quit" };

export type SummaryStat = {
  name: string;
  value: string;
  isWinner?: boolean;
};

export type GameSummary = {
  isSolo: boolean;
  title: string;
  description: string;
  stats: SummaryStat[];
};
