import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { GameTheme } from "@/types/game";
import {
  faStar,
  faHeart,
  faBolt,
  faMoon,
  faSun,
  faCloud,
  faFire,
  faLeaf,
  faSnowflake,
  faGem,
  faAnchor,
  faBell,
  faCarrot,
  faFeather,
  faFish,
  faGhost,
  faKey,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

export const TILE_ICONS: IconDefinition[] = [
  faStar,
  faHeart,
  faBolt,
  faMoon,
  faSun,
  faCloud,
  faFire,
  faLeaf,
  faSnowflake,
  faGem,
  faAnchor,
  faBell,
  faCarrot,
  faFeather,
  faFish,
  faGhost,
  faKey,
  faMusic,
];

// What a tile shows, in words: its number or its icon's name
export function getTileValueName(value: number, theme: GameTheme) {
  return theme === "numbers" ? String(value) : TILE_ICONS[value].iconName;
}
