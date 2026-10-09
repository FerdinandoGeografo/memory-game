import { getGameSummary, type GameSummary } from "@/game/summary";
import useGame from "./useGame";

export default function useGameSummary(): GameSummary | null {
  const { state } = useGame();
  return getGameSummary(state);
}
