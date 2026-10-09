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
      {/* Bottom padding = Figma space under the stats, kept when a short
          viewport scrolls: 24px mobile, 48px tablet, 74px desktop */}
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-6 pb-6 md:px-10 md:pt-9.25 md:pb-12 lg:px-41.25 lg:pt-16.75 lg:pb-18.5">
        <GameToolbar />

        <GameBoard />
        <GameAnnouncer />

        <GameStats />
      </div>

      <ResultDialog />
    </div>
  );
}
