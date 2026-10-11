import { getGameSummary } from "@/game/summary";
import type { GameSummary } from "@/types/game";
import useGame from "@/hooks/useGame";

export default function useGameSummary(): GameSummary | null {
  const { state } = useGame();
  return getGameSummary(state);
}
