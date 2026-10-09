import { motion, type Variants } from "motion/react";
import type { Tile } from "@/types/game";
import useGame from "@/hooks/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TILE_ICONS } from "@/constants/tile-icons";

interface TileProps {
  tile: Tile;
  index: number;
}

export default function Tile({ tile, index }: TileProps) {
  const {
    state: {
      config: { gridSize, theme },
    },
    dispatch,
  } = useGame();

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: "-100%",
      transition: { duration: 0.05, ease: "easeIn" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  const columns = gridSize === "4x4" ? 4 : 6;
  const position = `Row ${Math.floor(index / columns) + 1}, column ${(index % columns) + 1}`;
  const valueName =
    theme === "numbers" ? String(tile.value) : TILE_ICONS[tile.value].iconName;
  const isCovered = tile.state === "covered";
  const label = isCovered
    ? `${position}, hidden`
    : `${position}, ${valueName}, ${tile.state === "matched" ? "matched" : "revealed"}`;

  return (
    // The grid column sets the width; the tile stays a circle at any size
    <motion.li variants={tileVariants} className="aspect-square">
      {/* The button never rotates, so focus stays visible on both faces */}
      <button
        type="button"
        aria-label={label}
        aria-disabled={!isCovered}
        className="group block size-full rounded-full perspective-distant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 aria-disabled:cursor-default"
        onClick={() =>
          dispatch({ type: "selectTile", payload: { tileId: tile.id } })
        }
      >
        <motion.span
          aria-hidden="true"
          className="relative block size-full transform-3d"
          animate={{ rotateY: isCovered ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-blue-700 transition-colors duration-300 backface-hidden group-hover:bg-blue-500" />
          <span
            className={`absolute inset-0 flex rotate-y-180 items-center justify-center rounded-full text-neutral-100 transition-colors duration-300 backface-hidden ${tile.state === "flipped" ? "bg-orange-500" : "bg-blue-200"} ${gridSize === "4x4" ? "text-4xl leading-15 sm:text-7xl" : "text-xl leading-7.5 sm:text-5xl sm:leading-15"}`}
          >
            {theme === "numbers" ? (
              tile.value
            ) : (
              <FontAwesomeIcon
                className={`${gridSize === "4x4" ? "size-8! sm:size-14!" : "size-8! sm:size-10!"}`}
                icon={TILE_ICONS[tile.value]}
              />
            )}
          </span>
        </motion.span>
      </button>
    </motion.li>
  );
}
