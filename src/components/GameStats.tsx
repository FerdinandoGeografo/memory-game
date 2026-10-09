import { GameStat } from "@/components/GameStat";
import useGame from "@/hooks/useGame";
import { cn } from "@/lib/utils";
import type { Player } from "@/types/game";
import { formatTime } from "@/utils/helpers";

function PlayerCard({
  player,
  isCurrent,
}: {
  player: Player;
  isCurrent: boolean;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center gap-5.75">
      {isCurrent && (
        <div
          style={{ clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)" }}
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-2 w-4 -translate-x-1/2 -translate-y-full bg-orange-500 sm:h-3 sm:w-6 lg:h-5 lg:w-10"
        />
      )}

      <GameStat
        variant="player"
        highlight={isCurrent ? "turn" : undefined}
        name={`player ${player.id}`}
        shortName={`P${player.id}`}
        value={player.score.toString()}
      />

      {isCurrent && (
        <span className="sr-only text-xs leading-4 tracking-widest text-blue-800 uppercase lg:not-sr-only lg:block">
          Current turn
        </span>
      )}
    </div>
  );
}

// Time and moves for a solo game, one card per player otherwise
export default function GameStats() {
  const {
    state: { players, moves, elapsedSeconds, currentPlayerIndex },
  } = useGame();

  const isMulti = players.length > 1;

  return (
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
          <PlayerCard
            key={player.id}
            player={player}
            isCurrent={currentPlayerIndex === i}
          />
        ))
      ) : (
        <>
          <GameStat name="time" value={formatTime(elapsedSeconds)} />
          <GameStat name="moves" value={moves.toString()} />
        </>
      )}
    </div>
  );
}
