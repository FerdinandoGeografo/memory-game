import { motion } from "motion/react";
import useGameActions from "@/hooks/useGameActions";
import useGameSummary from "@/hooks/useGameSummary";
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
  const summary = useGameSummary();

  const open = summary !== null;

  return (
    <Dialog
      open={open}
      // Results close only through Restart or Setup New Game
      onOpenChange={(_open, details) => details.cancel()}
    >
      {/* Header, rows and buttons enter in turn after the popup */}
      <DialogContent finalFocus={finalFocus}>
        <DialogHeader variants={fadeUp()}>
          <DialogTitle>{summary?.title}</DialogTitle>
          <DialogDescription>{summary?.description}</DialogDescription>
        </DialogHeader>

        <motion.div
          variants={staggerChildren(0.08)}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {summary?.stats.map((stat) => (
            <GameStat
              variant="result"
              key={stat.name}
              name={stat.name}
              value={stat.value}
              highlight={stat.isWinner ? "winner" : undefined}
              variants={fadeUp()}
            />
          ))}
        </motion.div>

        {/* Player rows keep more room above the buttons than solo stats */}
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
