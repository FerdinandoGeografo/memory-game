import useGame from "@/hooks/useGame";
import Tile from "@/components/Tile";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";

const boardVariants: Variants = {
  hidden: {
    transition: { delayChildren: stagger(0.02, { from: "last" }) },
  },
  visible: {
    transition: { delayChildren: stagger(0.05, { startDelay: 0.15 }) },
  },
};

export default function GameBoard() {
  const {
    state: { config, board, roundId },
  } = useGame();

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={roundId}
        variants={boardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        aria-label="Game board"
        className={`mt-20 mb-25.25 grid self-center ${config.gridSize === "4x4" ? "grid-cols-4 gap-3.25 sm:mt-26.25 sm:mb-30.5 sm:gap-5" : "grid-cols-6 gap-2.25 sm:mt-21.25 sm:mb-25.5 sm:gap-4"}`}
      >
        {board.map((tile, index) => (
          <Tile key={tile.id} tile={tile} index={index} />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
