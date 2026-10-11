import type { GameState } from "@/types/game";
import { getFlippedTiles } from "@/utils/board";
import { getTileValueName } from "@/utils/format";

// Every message carries a changing number, so repeated outcomes are still announced
export function getAnnouncement({
  status,
  config,
  lastMatch,
  players,
  currentPlayerIndex,
  board,
  moves,
}: GameState): string {
  const revealed = getFlippedTiles(board).map((t) =>
    getTileValueName(t.value, config.theme),
  );
  if (revealed.length > 0) return `Revealed ${revealed.join(" and ")}.`;

  if (lastMatch === null || status === "finished") return "";

  if (players.length === 1) {
    const pairs = board.length / 2;
    return lastMatch
      ? `Match! ${players[0].score} of ${pairs} pairs found.`
      : `No match. ${moves} ${moves === 1 ? "move" : "moves"}.`;
  }

  const current = players[currentPlayerIndex];
  return lastMatch
    ? `Match! Player ${current.id} has ${current.score} ${current.score === 1 ? "pair" : "pairs"} and plays again.`
    : `No match. Player ${current.id}'s turn.`;
}
