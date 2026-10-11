import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { GameTheme } from "@/types/game";
import {
  faAnchor,
  faFlask,
  faSun,
  faHandSpock,
  faMoon,
  faFutbol,
  faCar,
  faTurkishLiraSign,
  faSnowflake,
  faStar,
  faHeart,
  faBolt,
  faCloud,
  faFire,
  faLeaf,
  faGem,
  faBell,
  faCarrot,
} from "@fortawesome/free-solid-svg-icons";

export const TILE_ICONS: IconDefinition[] = [
  faAnchor,
  faFlask,
  faSun,
  faHandSpock,
  faMoon,
  faFutbol,
  faCar,
  faTurkishLiraSign,
  faSnowflake,
  faStar,
  faHeart,
  faBolt,
  faCloud,
  faFire,
  faLeaf,
  faGem,
  faBell,
  faCarrot,
];

// What a tile shows, in words: its number or its icon's name
export function getTileValueName(value: number, theme: GameTheme) {
  return theme === "numbers"
    ? String(value)
    : TILE_ICONS[value].iconName.replaceAll("-", " ");
}
