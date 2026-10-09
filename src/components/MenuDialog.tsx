import useGameActions from "@/hooks/useGameActions";
import { Button } from "@/ui/button";
import { DialogContent, DialogClose, DialogTitle } from "@/ui/dialog";

export default function MenuDialog({ open }: { open: boolean }) {
  const { restart, newGame } = useGameActions();

  return (
    <DialogContent open={open} className="gap-4 p-6">
      {/* The design has no visible title; keep an accessible name */}
      <DialogTitle className="sr-only">Game menu</DialogTitle>

      <DialogClose
        render={<Button size="lg" className="w-full" onClick={restart} />}
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
