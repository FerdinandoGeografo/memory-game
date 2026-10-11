import { Button } from "@/ui/button";
import Logo from "@/components/Logo";
import useGame from "@/hooks/useGame";
import useGameActions from "@/hooks/useGameActions";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import MenuDialog from "@/components/MenuDialog";

export default function GameToolbar() {
  const {
    state: { status },
  } = useGame();
  const { restart, newGame, pause, resume } = useGameActions();

  const menuOpen = status === "paused";

  return (
    <header className="flex items-center justify-between gap-2">
      <Logo variant="dark" className="max-sm:text-2xl" />

      <div className="hidden items-center gap-4 sm:flex">
        <Button className="min-w-31.75" onClick={restart}>
          Restart
        </Button>
        <Button variant="secondary" onClick={newGame}>
          New game
        </Button>
      </div>

      <Dialog
        open={menuOpen}
        onOpenChange={(open) => (open ? pause() : resume())}
      >
        <DialogTrigger render={<Button className="sm:hidden" />}>
          Menu
        </DialogTrigger>
        <MenuDialog />
      </Dialog>
    </header>
  );
}
