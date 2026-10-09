import type { GameAction, GridSize } from "@/types/game";
import { generateBoard } from "@/utils/helpers";

export function startGame(gridSize: GridSize): GameAction {
  return { type: "start", payload: { board: generateBoard(gridSize) } };
}

export function restartGame(gridSize: GridSize): GameAction {
  return { type: "restart", payload: { board: generateBoard(gridSize) } };
}
