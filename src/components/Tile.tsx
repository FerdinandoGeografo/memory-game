import { motion, type Variants } from "motion/react";
import type { Tile } from "@/types/game";
import useGame from "@/hooks/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TILE_ICONS } from "@/constants/tile-icons";

export default function Tile({ tile }: { tile: Tile }) {
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

  return (
    <motion.li
      variants={tileVariants}
      className={`relative perspective-distant ${gridSize === "4x4" ? "size-18 sm:size-29.5" : "size-11.75 sm:size-20.5"}`}
    >
      <motion.div
        className="relative size-full transform-3d"
        animate={{ rotateY: tile.state === "covered" ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          type="button"
          aria-label={`Reveal tile ${tile.id}`}
          disabled={tile.state !== "covered"}
          className="absolute inset-0 size-full cursor-pointer rounded-full bg-blue-800 transition-colors duration-300 backface-hidden hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none"
          onClick={() =>
            dispatch({ type: "selectTile", payload: { tileId: tile.id } })
          }
        />
        <div
          aria-hidden={tile.state === "covered"}
          className={`absolute inset-0 flex size-full rotate-y-180 items-center justify-center rounded-full text-neutral-100 transition-colors duration-300 backface-hidden ${tile.state === "flipped" ? "bg-orange-500" : "bg-blue-200"} ${gridSize === "4x4" ? "text-4xl leading-15 sm:text-7xl" : "text-xl leading-7.5 sm:text-5xl sm:leading-15"}`}
        >
          {theme === "numbers" ? (
            tile.value
          ) : (
            <FontAwesomeIcon
              className={`${gridSize === "4x4" ? "size-8! sm:size-14!" : "size-8! sm:size-10!"}`}
              icon={TILE_ICONS[tile.value]}
              aria-hidden="false"
              aria-label={TILE_ICONS[tile.value].iconName}
              role="img"
            />
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}
