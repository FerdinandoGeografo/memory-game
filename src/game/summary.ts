import type { GameState } from "@/types/game";
import { formatTime } from "@/utils/helpers";

type SummaryStat = {
  name: string;
  value: string;
  isWinner?: boolean;
};

export type GameSummary = {
  title: string;
  description: string;
  stats: SummaryStat[];
};

type SummaryInput = Pick<
  GameState,
  "status" | "players" | "moves" | "elapsedSeconds"
>;

export function getGameSummary({
  status,
  players,
  moves,
  elapsedSeconds,
}: SummaryInput): GameSummary | null {
  if (status !== "finished") return null;

  if (players.length === 1) {
    return {
      title: "You did it!",
      description: "Game over! Here’s how you got on…",
      stats: [
        {
          name: "Time elapsed",
          value: formatTime(elapsedSeconds),
        },
        {
          name: "Moves taken",
          value: `${moves} Moves`,
        },
      ],
    };
  }

  const ranked = [...players].sort((a, b) => b.score - a.score);
  const topScore = ranked[0].score;
  const winners = ranked.filter((p) => p.score === topScore);

  return {
    title: winners.length > 1 ? "It’s a tie!" : `Player ${winners[0].id} Wins!`,
    description: "Game over! Here are the results…",
    stats: ranked.map((p) => ({
      name:
        p.score === topScore ? `Player ${p.id} (Winner!)` : `Player ${p.id}`,
      value: `${p.score} Pairs`,
      isWinner: p.score === topScore,
    })),
  };
}
