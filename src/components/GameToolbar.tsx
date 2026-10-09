import { Button } from "@/ui/button";
import Logo from "./Logo";
import useGame from "@/hooks/useGame";
import { useNavigate } from "react-router";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import MenuDialog from "./MenuDialog";

export default function GameToolbar() {
  const navigate = useNavigate();
  const {
    state: { status },
    dispatch,
  } = useGame();

  const menuOpen = status === "paused";

  function handleNewGame() {
    dispatch({ type: "quit" });
    navigate("/start");
  }

  return (
    <header className="flex items-center justify-between gap-2">
      <Logo variant="dark" />

      <div className="hidden items-center gap-4 sm:flex">
        <Button onClick={() => dispatch({ type: "restart" })}>Restart</Button>
        <Button variant="secondary" onClick={handleNewGame}>
          New game
        </Button>
      </div>

      <Dialog
        open={menuOpen}
        onOpenChange={(open) => dispatch({ type: open ? "pause" : "resume" })}
      >
        <DialogTrigger render={<Button className="sm:hidden" />}>
          Menu
        </DialogTrigger>
        <MenuDialog open={menuOpen} />
      </Dialog>
    </header>
  );
}
