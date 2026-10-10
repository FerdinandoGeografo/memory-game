import useGame from "@/hooks/useGame";
import Tile from "@/components/Tile";
import type { GridSize } from "@/types/game";
import { AnimatePresence, motion, useIsPresent } from "motion/react";

// While a board leaves (Restart) it is inert: its tile ids already belong to
// the next round, and focus returning from a dialog must skip it
function Board({
  gridSize,
  children,
}: {
  gridSize: GridSize;
  children: React.ReactNode;
}) {
  const isPresent = useIsPresent();

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      exit="hidden"
      inert={!isPresent}
      aria-label="Game board"
      className={`mt-20 grid w-full max-w-81.75 self-center ${gridSize === "4x4" ? "grid-cols-4 gap-3.25 sm:mt-39.25 sm:max-w-133 sm:gap-5 lg:mt-26.25" : "grid-cols-6 gap-2.25 sm:mt-30.25 sm:max-w-143 sm:gap-4 lg:mt-21.25"}`}
    >
      {children}
    </motion.ul>
  );
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
      <Board key={roundId} gridSize={config.gridSize}>
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
      </Board>
    </AnimatePresence>
  );
}
