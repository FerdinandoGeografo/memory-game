import { TILE_ICONS } from "@/constants/tile-icons";
import type { GameTheme } from "@/types/game";

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

export function playerName(id: number) {
  return `Player ${id}`;
}

export function plural(
  count: number,
  singular: string,
  pluralForm = `${singular}s`,
) {
  return count === 1 ? singular : pluralForm;
}
