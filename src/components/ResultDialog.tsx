import { motion } from "motion/react";
import { useRef } from "react";
import useGameActions from "@/hooks/useGameActions";
import { getGameSummary } from "@/utils/summary";
import useGame from "@/hooks/useGame";
import { fadeUp, staggerChildren } from "@/lib/motion/variants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import GameStat from "@/components/GameStat";

interface ResultDialogProps {
  finalFocus: React.RefObject<HTMLElement | null>;
}

export default function ResultDialog({ finalFocus }: ResultDialogProps) {
  const { restart, newGame } = useGameActions();
  const { state } = useGame();
  const summary = getGameSummary(state);

  const open = summary !== null;
  const titleRef = useRef<HTMLHeadingElement>(null);

  function focusTitleIfScrollable() {
    const popup = titleRef.current?.closest<HTMLElement>('[role="dialog"]');
    const viewport = popup?.parentElement;
    if (!popup || !viewport) return true;

    const { paddingTop, paddingBottom } = getComputedStyle(viewport);
    const room =
      viewport.clientHeight -
      parseFloat(paddingTop) -
      parseFloat(paddingBottom);
    return popup.offsetHeight > room ? titleRef.current : true;
  }

  return (
    <Dialog open={open} onOpenChange={(_open, details) => details.cancel()}>
      <DialogContent
        initialFocus={focusTitleIfScrollable}
        finalFocus={finalFocus}
      >
        <DialogHeader variants={fadeUp()}>
          <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
            {summary?.title}
          </DialogTitle>
          <DialogDescription>{summary?.description}</DialogDescription>
        </DialogHeader>

        <motion.div
          variants={staggerChildren(0.08)}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {summary?.stats.map((stat) => (
            <GameStat
              layout="result"
              key={stat.name}
              name={stat.name}
              value={stat.value}
              highlight={stat.isWinner ? "winner" : undefined}
              variants={fadeUp()}
            />
          ))}
        </motion.div>

        <DialogFooter
          variants={fadeUp()}
          className={summary?.isSolo ? undefined : "sm:mt-4"}
        >
          <Button size="md" className="sm:flex-1" onClick={restart}>
            Restart
          </Button>

          <Button
            variant="secondary"
            size="md"
            className="sm:flex-1"
            onClick={newGame}
          >
            Setup New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
