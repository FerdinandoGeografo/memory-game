import useGameActions from "@/hooks/useGameActions";
import { fadeUp } from "@/lib/motion/variants";
import { Button } from "@/ui/button";
import { DialogContent, DialogClose, DialogTitle } from "@/ui/dialog";

export default function MenuDialog() {
  const { restart, newGame } = useGameActions();

  return (
    <DialogContent className="gap-4 p-6">
      <DialogTitle className="sr-only">Game menu</DialogTitle>

      <DialogClose
        render={
          <Button
            size="lg"
            className="w-full"
            onClick={restart}
            variants={fadeUp()}
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
            onClick={newGame}
            variants={fadeUp()}
          />
        }
      >
        New Game
      </DialogClose>

      <DialogClose
        render={
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            variants={fadeUp()}
          />
        }
      >
        Resume Game
      </DialogClose>
    </DialogContent>
  );
}
