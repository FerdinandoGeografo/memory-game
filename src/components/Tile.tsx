import { motion, type Variants } from "motion/react";
import type { GameTheme, GridSize, Tile } from "@/types/game";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTileValueName, TILE_ICONS } from "@/constants/tile-icons";
import { flip, quickSpring } from "@/lib/motion/transitions";

const ENTRANCE_START = 0.15;
const ENTRANCE_SPREAD = 0.6;

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { ...quickSpring, delay },
  }),
};

const faceVariants: Variants = {
  covered: { rotateY: 0, scale: 1 },
  flipped: { rotateY: 180, scale: 1 },
  matched: {
    rotateY: 180,
    scale: [1, 1.08, 1],
    transition: { ...flip, scale: { duration: 0.4, ease: "easeInOut" } },
  },
};

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
  const columns = gridSize === "4x4" ? 4 : 6;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const position = `Row ${row + 1}, column ${column + 1}`;
  const entranceDelay =
    ENTRANCE_START + ((row + column) / (2 * (columns - 1))) * ENTRANCE_SPREAD;
  const valueName = getTileValueName(tile.value, theme);
  const isCovered = tile.state === "covered";
  const label = isCovered
    ? `${position}, hidden`
    : `${position}, ${valueName}, ${tile.state === "matched" ? "matched" : "revealed"}`;

  return (
    <motion.li
      variants={tileVariants}
      custom={entranceDelay}
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
          <span
            className={`absolute inset-0 flex rotate-y-180 items-center justify-center rounded-full text-neutral-100 transition-colors backface-hidden ${tile.state === "flipped" ? "bg-orange-500" : "bg-blue-200"} ${gridSize === "4x4" ? "text-5xl leading-15 sm:text-8xl" : "text-2xl sm:text-6xl sm:leading-15"}`}
          >
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
