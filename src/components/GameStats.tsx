import { motion } from "motion/react";
import GameStat from "@/components/GameStat";
import PlayerCard from "@/components/PlayerCard";
import { STATS_SPACING } from "@/constants/styles/game-stats";
import useGame from "@/hooks/useGame";
import { fadeDown, staggerChildren } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/helpers";

export default function GameStats() {
  const {
    state: { config, players, moves, elapsedMs, currentPlayerIndex },
  } = useGame();

  const isMulti = players.length > 1;
  const spacing = STATS_SPACING[isMulti ? "multi" : "solo"];

  return (
    <motion.div
      variants={staggerChildren(0.08, 0.5)}
      initial="hidden"
      animate="visible"
      className={cn(
        "mt-25.5 mb-6 flex",
        spacing.top[config.gridSize],
        spacing.bottom,
        isMulti
          ? "justify-center gap-6 sm:gap-2.75 lg:gap-7.5"
          : "gap-6.25 sm:mx-auto sm:w-full sm:max-w-135 sm:gap-7.5",
      )}
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
            name="time"
            value={formatTime(elapsedMs)}
            variants={fadeDown()}
          />
          <GameStat
            name="moves"
            value={moves.toString()}
            variants={fadeDown()}
          />
        </>
      )}
    </motion.div>
  );
}
