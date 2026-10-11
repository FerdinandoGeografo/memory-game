import { motion } from "motion/react";
import GameStat from "@/components/GameStat";
import PlayerCard from "@/components/PlayerCard";
import { statsVariants } from "@/constants/game-stats";
import useGame from "@/hooks/useGame";
import { fadeDown, staggerChildren } from "@/lib/motion/variants";
import { formatTime } from "@/utils/format";

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
