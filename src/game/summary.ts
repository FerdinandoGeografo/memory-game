import type { GameState, GameSummary } from "@/types/game";
import { formatTime } from "@/utils/helpers";

type SummaryInput = Pick<
  GameState,
  "status" | "players" | "moves" | "elapsedMs"
>;

export function getGameSummary({
  status,
  players,
  moves,
  elapsedMs,
}: SummaryInput): GameSummary | null {
  if (status !== "finished") return null;

  if (players.length === 1) {
    return {
      isSolo: true,
      title: "You did it!",
      description: "Game over! Here’s how you got on…",
      stats: [
        {
          name: "Time Elapsed",
          value: formatTime(elapsedMs),
        },
        {
          name: "Moves Taken",
          value: `${moves} Moves`,
        },
      ],
    };
  }

  const ranked = [...players].sort((a, b) => b.score - a.score);
  const topScore = ranked[0].score;
  const winners = ranked.filter((p) => p.score === topScore);

  return {
    isSolo: false,
    title: winners.length > 1 ? "It’s a tie!" : `Player ${winners[0].id} Wins!`,
    description: "Game over! Here are the results…",
    stats: ranked.map((p) => ({
      name:
        p.score === topScore ? `Player ${p.id} (Winner!)` : `Player ${p.id}`,
      value: `${p.score} ${p.score === 1 ? "Pair" : "Pairs"}`,
      isWinner: p.score === topScore,
    })),
  };
}
