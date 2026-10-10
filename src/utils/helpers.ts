import type { GridSize, Player, PlayerCount, Tile } from "@/types/game";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateBoard(gridSize: GridSize): Tile[] {
  const dim = gridSize === "4x4" ? 4 : 6;
  const pairsCount = (dim * dim) / 2;
  const values = Array.from({ length: pairsCount }, (_, i) => i);
  const deck = shuffle([...values, ...values]);

  return deck.map((value, id) => ({ id, value, state: "covered" as const }));
}

export function generatePlayers(count: PlayerCount): Player[] {
  return Array.from({ length: Number(count) }, (_, i) => ({
    id: i + 1,
    score: 0,
  }));
}

export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
