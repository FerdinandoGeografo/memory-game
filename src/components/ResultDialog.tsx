import useGameActions from "@/hooks/useGameActions";
import useGameSummary from "@/hooks/useGameSummary";
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

const WINNER_HIGHLIGHT = { bg: "bg-blue-800", text: "text-white" };

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{summary?.title}</DialogTitle>
          <DialogDescription>{summary?.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 sm:gap-4">
          {summary?.stats.map((stat) => (
            <GameStat
              variant="result"
              key={stat.name}
              name={stat.name}
              value={stat.value}
              highlight={stat.isWinner ? WINNER_HIGHLIGHT : undefined}
            />
          ))}
        </div>

        <DialogFooter className="sm:mt-4">
          <Button
            className="h-12 text-lg leading-5.5 sm:flex-1"
            onClick={restart}
          >
            Restart
          </Button>

          <Button
            variant="secondary"
            className="h-12 text-lg leading-5.5 sm:flex-1"
            onClick={newGame}
          >
            Setup New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
