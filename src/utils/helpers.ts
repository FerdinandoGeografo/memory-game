import { GRID_COLUMNS, TILE_VALUE_COUNT } from "@/constants/game-options";
import { TILE_ICONS } from "@/constants/tile-icons";
import type {
  GameTheme,
  GridSize,
  Player,
  PlayerCount,
  Tile,
} from "@/types/game";

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

export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getTileValueName(value: number, theme: GameTheme) {
  return theme === "numbers"
    ? String(value)
    : TILE_ICONS[value].iconName.replaceAll("-", " ");
}
