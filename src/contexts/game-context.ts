import type { GameAction, GameState } from "@/types/game";
import { createContext } from "react";

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextValue | null>(null);
