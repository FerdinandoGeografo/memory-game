import useGame from "@/hooks/useGame";
import Tile from "@/components/Tile";
import { boardVariants } from "@/constants/game-board";
import { AnimatePresence, motion } from "motion/react";

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
