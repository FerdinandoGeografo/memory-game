import { DEFAULT_GAME_CONFIG } from "@/constants/game-options";
import type { GameState } from "@/types/game";

export const initialState: GameState = {
  config: DEFAULT_GAME_CONFIG,
  status: "idle",
  board: [],
  players: [],
  currentPlayerIndex: 0,
  isChecking: false,
  lastMatch: null,
  moves: 0,
  elapsedMs: 0,
  runningSince: null,
  roundId: 0,
};
