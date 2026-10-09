import GameAnnouncer from "@/components/GameAnnouncer";
import GameBoard from "@/components/GameBoard";
import GameStats from "@/components/GameStats";
import GameToolbar from "@/components/GameToolbar";
import ResultDialog from "@/components/ResultDialog";
import useGame from "@/hooks/useGame";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Game() {
  const navigate = useNavigate();
  const {
    state: { status },
  } = useGame();

  useEffect(() => {
    if (status === "idle") navigate("/start");
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-6 md:px-10 md:pt-9.25 lg:px-41.25 lg:pt-16.75">
        <GameToolbar />

        <GameBoard />
        <GameAnnouncer />

        <GameStats />
      </div>

      <ResultDialog />
    </div>
  );
}
