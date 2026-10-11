import { GRID_COLUMNS, TILE_VALUE_COUNT } from "@/constants/game-options";
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
  const pairsCount = GRID_COLUMNS[gridSize] ** 2 / 2;
  const values = shuffle(
    Array.from({ length: TILE_VALUE_COUNT }, (_, i) => i),
  ).slice(0, pairsCount);
  const deck = shuffle([...values, ...values]);

  return deck.map((value, id) => ({ id, value, state: "covered" as const }));
}

export function generatePlayers(count: PlayerCount): Player[] {
  return Array.from({ length: Number(count) }, (_, i) => ({
    id: i + 1,
    score: 0,
  }));
}

export function getFlippedTiles(board: Tile[]): Tile[] {
  return board.filter((t) => t.state === "flipped");
}
