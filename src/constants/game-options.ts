import type { GameConfig } from "@/types/game";

export const THEME_OPTIONS = [
  { value: "numbers", label: "Numbers" },
  { value: "icons", label: "Icons" },
] as const;

export const PLAYERS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
] as const;

export const GRID_SIZE_OPTIONS = [
  { value: "4x4", label: "4x4" },
  { value: "6x6", label: "6x6" },
] as const;

export const DEFAULT_GAME_CONFIG: GameConfig = {
  theme: "numbers",
  players: "1",
  gridSize: "4x4",
};
