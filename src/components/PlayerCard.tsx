import { AnimatePresence, motion } from "motion/react";
import GameStat from "@/components/GameStat";
import { leave, quickSpring, slide } from "@/lib/motion/transitions";
import { fadeDown } from "@/lib/motion/variants";
import type { Player } from "@/types/game";
import { playerName } from "@/utils/format";

interface PlayerCardProps {
  player: Player;
  isCurrent: boolean;
}

export default function PlayerCard({ player, isCurrent }: PlayerCardProps) {
  return (
    <motion.div
      variants={fadeDown()}
      className="relative flex-1 lg:max-w-63.75"
    >
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
        name={playerName(player.id)}
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
