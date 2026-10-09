import useGame from "@/hooks/useGame";
import { restartGame } from "@/game/actions";
import { Button } from "@/ui/button";
import { DialogContent, DialogClose, DialogTitle } from "@/ui/dialog";
import { useNavigate } from "react-router";

export default function MenuDialog({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const {
    state: { config },
    dispatch,
  } = useGame();

  return (
    <DialogContent open={open} className="gap-4 p-6">
      {/* The design has no visible title; keep an accessible name */}
      <DialogTitle className="sr-only">Game menu</DialogTitle>

      <DialogClose
        render={
          <Button
            size="lg"
            className="w-full"
            onClick={() => dispatch(restartGame(config.gridSize))}
          />
        }
      >
        Restart
      </DialogClose>

      <DialogClose
        render={
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={() => {
              dispatch({ type: "quit" });
              navigate("/start");
            }}
          />
        }
      >
        New game
      </DialogClose>

      <DialogClose
        render={<Button size="lg" variant="secondary" className="w-full" />}
      >
        Resume
      </DialogClose>
    </DialogContent>
  );
}
