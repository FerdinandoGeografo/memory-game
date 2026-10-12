import type { GameState } from "@/types/game";
import { getFlippedTiles } from "@/utils/board";
import { playerName, plural } from "@/utils/format";

export function getAnnouncement({
  status,
  lastMatch,
  players,
  currentPlayerIndex,
  board,
  moves,
}: GameState): string {
  if (getFlippedTiles(board).length > 0) return "";

  if (lastMatch === null || status === "finished") return "";

  if (players.length === 1) {
    const pairs = board.length / 2;
    return lastMatch
      ? `Match! ${players[0].score} of ${pairs} pairs found.`
      : `No match. ${moves} ${plural(moves, "move")}.`;
  }

  const current = players[currentPlayerIndex];
  return lastMatch
    ? `Match! ${playerName(current.id)} has ${current.score} ${plural(current.score, "pair")} and plays again.`
    : `No match. ${playerName(current.id)}'s turn.`;
}
