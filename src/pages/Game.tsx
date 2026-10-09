import GameAnnouncer from "@/components/GameAnnouncer";
import GameBoard from "@/components/GameBoard";
import { GameStat } from "@/components/GameStat";
import GameToolbar from "@/components/GameToolbar";
import ResultDialog from "@/components/ResultDialog";
import useGame from "@/hooks/useGame";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Game() {
  const navigate = useNavigate();
  const {
    state: { status, players, moves, elapsedSeconds, currentPlayerIndex },
  } = useGame();

  useEffect(() => {
    if (status === "idle") navigate("/start");
  }, [status, navigate]);

  const isMulti = players.length > 1;

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-6 md:px-10 md:pt-9.25 lg:px-41.25 lg:pt-16.75">
        <GameToolbar />

        <GameBoard />
        <GameAnnouncer />

        <div
          className={cn(
            "flex",
            isMulti
              ? "gap-6 sm:gap-2.75 lg:gap-7.5"
              : // Solo stats are a centred 540px group from tablet up
                "gap-6.25 sm:mx-auto sm:w-full sm:max-w-135 sm:gap-7.5",
          )}
        >
          {isMulti ? (
            players.map((player, i) => (
              <div
                className="relative flex flex-1 flex-col items-center gap-5.75"
                key={player.id}
              >
                {currentPlayerIndex === i && (
                  <div
                    style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 h-2 w-4 -translate-x-1/2 -translate-y-full bg-orange-500 sm:h-3 sm:w-6 lg:h-5 lg:w-10"
                  ></div>
                )}

                <GameStat
                  variant="player"
                  highlight={
                    currentPlayerIndex === i
                      ? { bg: "bg-orange-500", text: "text-white" }
                      : undefined
                  }
                  name={`player ${player.id}`}
                  value={player.score.toString()}
                />

                {currentPlayerIndex === i && (
                  <span className="sr-only text-xs leading-4 tracking-widest text-blue-800 uppercase lg:not-sr-only lg:block">
                    Current turn
                  </span>
                )}
              </div>
            ))
          ) : (
            <>
              <GameStat name="time" value={formatTime(elapsedSeconds)} />
              <GameStat name="moves" value={moves.toString()} />
            </>
          )}
        </div>
      </div>

      <ResultDialog />
    </div>
  );
}
