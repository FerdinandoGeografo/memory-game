import useGame from "@/hooks/useGame";
import Tile from "@/components/Tile";
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
        // Each tile times its own entrance (Tile); on Restart they all leave
        // together before the new board comes in
        initial="hidden"
        animate="visible"
        exit="hidden"
        aria-label="Game board"
        // Fluid width capped at the Figma size: 327px mobile, 532/572px from tablet
        className={`mt-20 grid w-full max-w-81.75 self-center ${config.gridSize === "4x4" ? "grid-cols-4 gap-3.25 sm:mt-39.25 sm:max-w-133 sm:gap-5 lg:mt-26.25" : "grid-cols-6 gap-2.25 sm:mt-30.25 sm:max-w-143 sm:gap-4 lg:mt-21.25"}`}
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
