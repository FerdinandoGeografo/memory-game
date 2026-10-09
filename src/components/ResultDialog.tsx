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
import { GameStat } from "./GameStat";

export default function ResultDialog() {
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
      <DialogContent>
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

        <DialogFooter variants={staggerChildren(0.08, 0.2)} className="sm:mt-4">
          <Button
            className="h-12 text-lg leading-5.5 sm:flex-1"
            onClick={restart}
            variants={fadeUp()}
          >
            Restart
          </Button>

          <Button
            variant="secondary"
            className="h-12 text-lg leading-5.5 sm:flex-1"
            onClick={newGame}
            variants={fadeUp()}
          >
            Setup New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
