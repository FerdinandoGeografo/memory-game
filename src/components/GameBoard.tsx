import useGame from "@/hooks/useGame";
import Tile from "@/components/Tile";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";

// Spread the entrance over a fixed time so 36 tiles don't take longer than 16
const ENTRANCE_SPREAD = 0.75;

function boardVariants(tileCount: number): Variants {
  const step = ENTRANCE_SPREAD / Math.max(tileCount - 1, 1);
  return {
    hidden: {
      transition: { delayChildren: stagger(step / 2, { from: "last" }) },
    },
    visible: {
      transition: { delayChildren: stagger(step, { startDelay: 0.15 }) },
    },
  };
}

export default function GameBoard() {
  const {
    state: { config, board, roundId },
    dispatch,
  } = useGame();

  function selectTile(tileId: number) {
    dispatch({ type: "selectTile", payload: { tileId } });
  }

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={roundId}
        variants={boardVariants(board.length)}
        initial="hidden"
        animate="visible"
        exit="hidden"
        aria-label="Game board"
        // Fluid width capped at the Figma size: 327px mobile, 532/572px from tablet
        className={`mt-20 mb-25.25 grid w-full max-w-81.75 self-center ${config.gridSize === "4x4" ? "grid-cols-4 gap-3.25 sm:mt-39.25 sm:mb-31.5 sm:max-w-133 sm:gap-5 lg:mt-26.25 lg:mb-30.5" : "grid-cols-6 gap-2.25 sm:mt-30.25 sm:mb-30.5 sm:max-w-143 sm:gap-4 lg:mt-21.25 lg:mb-25.5"}`}
      >
        {board.map((tile, index) => (
          <Tile
            key={tile.id}
            tile={tile}
            index={index}
            gridSize={config.gridSize}
            theme={config.theme}
            onSelect={selectTile}
          />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
