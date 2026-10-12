import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import GameStat from "@/components/GameStat";
import PlayerCard from "@/components/PlayerCard";
import useGame from "@/hooks/useGame";
import { fadeDown, staggerChildren } from "@/lib/motion/variants";
import { formatTime } from "@/utils/format";

const statsVariants = cva("mt-25.5 mb-5 flex", {
  variants: {
    mode: {
      solo: "gap-6.25 sm:mx-auto sm:w-full sm:max-w-135 sm:gap-7.5",
      multi: "justify-center gap-6 sm:gap-2.75 lg:mb-14 lg:gap-7.5",
    },
    gridSize: { "4x4": "", "6x6": "" },
  },
  compoundVariants: [
    { mode: "solo", gridSize: "4x4", class: "sm:mt-31.5" },
    { mode: "solo", gridSize: "6x6", class: "sm:mt-30.5 lg:mt-26.5" },
    { mode: "multi", gridSize: "4x4", class: "sm:mt-32 lg:mt-30.5" },
    { mode: "multi", gridSize: "6x6", class: "sm:mt-31 lg:mt-25.5" },
  ],
});

export default function GameStats() {
  const {
    state: { config, players, moves, elapsedMs, currentPlayerIndex },
  } = useGame();

  const isMulti = players.length > 1;

  return (
    <motion.div
      variants={staggerChildren(0.08, 0.5)}
      initial="hidden"
      animate="visible"
      className={statsVariants({
        mode: isMulti ? "multi" : "solo",
        gridSize: config.gridSize,
      })}
    >
      {isMulti ? (
        players.map((player, i) => (
          <PlayerCard
            key={player.id}
            player={player}
            isCurrent={currentPlayerIndex === i}
          />
        ))
      ) : (
        <>
          <GameStat
            name="Time"
            value={formatTime(elapsedMs)}
            variants={fadeDown()}
          />
          <GameStat
            name="Moves"
            value={moves.toString()}
            variants={fadeDown()}
          />
        </>
      )}
    </motion.div>
  );
}
