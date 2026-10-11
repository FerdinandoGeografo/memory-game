import { motion, useIsPresent } from "motion/react";
import type { GameTheme, GridSize, Tile } from "@/types/game";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tileFaceVariants } from "@/constants/tile";
import { TILE_ICONS } from "@/constants/tile-icons";
import {
  faceVariants,
  tileEntranceDelay,
  tileVariants,
} from "@/lib/motion/tile";
import { flip, quickSpring } from "@/lib/motion/transitions";
import { getTileValueName } from "@/utils/helpers";

interface TileProps {
  tile: Tile;
  index: number;
  gridSize: GridSize;
  theme: GameTheme;
  onSelect: (tileId: Tile["id"]) => void;
}

export default function Tile({
  tile,
  index,
  gridSize,
  theme,
  onSelect,
}: TileProps) {
  const isPresent = useIsPresent();
  const columns = gridSize === "4x4" ? 4 : 6;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const position = `Row ${row + 1}, column ${column + 1}`;
  const entranceDelay = tileEntranceDelay(row, column, columns);
  const valueName = getTileValueName(tile.value, theme);
  const isCovered = tile.state === "covered";
  const label = isCovered
    ? `${position}, hidden`
    : `${position}, ${valueName}, ${tile.state === "matched" ? "matched" : "revealed"}`;

  return (
    <motion.li
      variants={tileVariants}
      custom={entranceDelay}
      inert={!isPresent}
      className="aspect-square"
    >
      <motion.button
        type="button"
        aria-label={label}
        aria-disabled={!isCovered}
        className="group focus-ring block size-full rounded-full perspective-distant aria-disabled:cursor-default"
        onClick={() => onSelect(tile.id)}
        whileTap={isCovered ? { scale: 0.92 } : undefined}
        transition={quickSpring}
      >
        <motion.span
          aria-hidden="true"
          className="relative block size-full transform-3d"
          variants={faceVariants}
          initial={false}
          animate={tile.state}
          transition={flip}
        >
          <span className="absolute inset-0 rounded-full bg-blue-700 transition-colors backface-hidden group-hover:bg-blue-500" />
          <span className={tileFaceVariants({ state: tile.state, gridSize })}>
            {theme === "numbers" ? (
              tile.value
            ) : (
              <FontAwesomeIcon
                className="size-[48%]!"
                icon={TILE_ICONS[tile.value]}
              />
            )}
          </span>
        </motion.span>
      </motion.button>
    </motion.li>
  );
}
