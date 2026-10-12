import { cva } from "class-variance-authority";
import useGame from "@/hooks/useGame";
import useGameActions from "@/hooks/useGameActions";
import Tile from "@/components/Tile";
import { AnimatePresence, motion } from "motion/react";

const boardVariants = cva("mt-20 grid w-full max-w-81.75 self-center", {
  variants: {
    gridSize: {
      "4x4":
        "grid-cols-4 gap-3.25 sm:mt-39.25 sm:max-w-133 sm:gap-5 lg:mt-26.25",
      "6x6":
        "grid-cols-6 gap-2.25 sm:mt-30.25 sm:max-w-143 sm:gap-4 lg:mt-21.25",
    },
  },
});

export default function GameBoard() {
  const {
    state: { config, board, roundId },
  } = useGame();
  const { selectTile } = useGameActions();

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={roundId}
        initial="hidden"
        animate="visible"
        exit="hidden"
        aria-label="Game board"
        className={boardVariants({ gridSize: config.gridSize })}
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
