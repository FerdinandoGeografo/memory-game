import { AnimatePresence, motion } from "motion/react";
import { GameStat } from "@/components/GameStat";
import useGame from "@/hooks/useGame";
import { leave, quickSpring, slide } from "@/lib/motion/transitions";
import { fadeDown, staggerChildren } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import type { Player } from "@/types/game";
import { formatTime } from "@/utils/helpers";

const SPACING = {
  solo: {
    bottom: "sm:mb-12 lg:mb-17.5",
    top: { "4x4": "sm:mt-31.5", "6x6": "sm:mt-30.5 lg:mt-26.5" },
  },
  multi: {
    bottom: "sm:mb-9.5 lg:mb-18.5",
    top: { "4x4": "sm:mt-32 lg:mt-30.5", "6x6": "sm:mt-31 lg:mt-25.5" },
  },
} as const;

// The stats come in one by one while the board's wave is ending
const statsVariants = staggerChildren(0.08, 0.5);
const cardVariants = fadeDown();

function PlayerCard({
  player,
  isCurrent,
}: {
  player: Player;
  isCurrent: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-1 lg:max-w-63.75"
    >
      {/* No animation for the first player: it enters with its card */}
      <AnimatePresence initial={false}>
        {isCurrent && (
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 h-2 w-4 -translate-x-1/2 -translate-y-full overflow-hidden sm:h-3 sm:w-6 lg:h-5 lg:w-10"
          >
            <motion.div
              style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
              className="size-full bg-orange-500"
              initial={{ y: "100%" }}
              animate={{
                y: 0,
                transition: { ...quickSpring, delay: slide.duration },
              }}
              exit={{ y: "100%", transition: leave }}
            />
          </div>
        )}
      </AnimatePresence>

      <GameStat
        variant="player"
        highlight={isCurrent ? "turn" : undefined}
        name={`player ${player.id}`}
        shortName={`P${player.id}`}
        value={player.score.toString()}
      />

      {isCurrent && (
        <div className="absolute inset-x-0 top-full mt-5.75 flex justify-center">
          <motion.span
            layoutId="current-turn"
            layout="position"
            transition={slide}
            className="sr-only text-xs tracking-widest text-blue-800 uppercase lg:not-sr-only"
          >
            Current turn
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}

export default function GameStats() {
  const {
    state: { config, players, moves, elapsedMs, currentPlayerIndex },
  } = useGame();

  const isMulti = players.length > 1;
  const spacing = SPACING[isMulti ? "multi" : "solo"];

  return (
    <motion.div
      variants={statsVariants}
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
            variants={cardVariants}
          />
          <GameStat
            name="moves"
            value={moves.toString()}
            variants={cardVariants}
          />
        </>
      )}
    </motion.div>
  );
}
