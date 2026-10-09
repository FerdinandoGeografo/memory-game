import useGame from "@/hooks/useGame";
import { restartGame } from "@/game/actions";
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
import { useNavigate } from "react-router";

const WINNER_HIGHLIGHT = { bg: "bg-blue-800", text: "text-white" };

export default function ResultDialog() {
  const {
    state: { config },
    dispatch,
  } = useGame();
  const navigate = useNavigate();
  const summary = useGameSummary();

  const open = summary !== null;

  return (
    <Dialog
      open={open}
      onOpenChange={() => dispatch(restartGame(config.gridSize))}
    >
      <DialogContent open={open}>
        <DialogHeader>
          <DialogTitle>{summary?.title}</DialogTitle>
          <DialogDescription>{summary?.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 sm:gap-4">
          {summary?.stats.map((stat) => (
            <GameStat
              className="flex-row items-start justify-between gap-2 rounded-lg"
              key={stat.name}
              name={stat.name}
              value={stat.value}
              highlight={stat.isWinner ? WINNER_HIGHLIGHT : undefined}
            />
          ))}
        </div>

        <DialogFooter className="sm:mt-4">
          <Button
            className="sm:flex-1"
            onClick={() => dispatch(restartGame(config.gridSize))}
          >
            Restart
          </Button>

          <Button
            variant="secondary"
            className="sm:flex-1"
            onClick={() => {
              dispatch({ type: "quit" });
              navigate("/start");
            }}
          >
            Setup New Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
