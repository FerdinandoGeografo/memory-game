import { getTileValueName } from "@/constants/tile-icons";
import useGame from "@/hooks/useGame";
import type { GameState } from "@/types/game";

// Every message carries a changing number, so repeated outcomes are still announced
function getAnnouncement({
  status,
  config,
  lastMatch,
  players,
  currentPlayerIndex,
  board,
  moves,
}: GameState): string {
  const revealed = board
    .filter((t) => t.state === "flipped")
    .map((t) => getTileValueName(t.value, config.theme));
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

export default function GameAnnouncer() {
  const { state } = useGame();

  return (
    <p role="status" className="sr-only">
      {getAnnouncement(state)}
    </p>
  );
}
