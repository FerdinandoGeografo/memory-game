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

export function getTileValueName(value: number, theme: GameTheme) {
  return theme === "numbers"
    ? String(value)
    : TILE_ICONS[value].iconName.replaceAll("-", " ");
}
