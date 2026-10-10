import { GameContext } from "@/contexts/game-context";
import { gameReducer, initialState } from "@/game/reducer";
import { useEffect, useReducer, type PropsWithChildren } from "react";

// A mismatch stays visible longer so the second value can be read
const MATCH_DELAY_MS = 450;
const MISMATCH_DELAY_MS = 800;

export function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { status, isChecking, roundId, board, elapsedMs } = state;

  const flipped = board.filter((t) => t.state === "flipped");
  const isPendingMatch =
    flipped.length === 2 && flipped[0].value === flipped[1].value;

  // Pausing clears the pending check; resuming schedules it again
  useEffect(() => {
    if (status !== "playing" || !isChecking) return;

    const check = setTimeout(
      () => {
        dispatch({
          type: "resolveMatch",
          payload: { roundId, now: performance.now() },
        });
      },
      isPendingMatch ? MATCH_DELAY_MS : MISMATCH_DELAY_MS,
    );

    return () => clearTimeout(check);
  }, [status, isChecking, roundId, isPendingMatch]);

  // Ticks on each whole second of play, to update the clock on screen. Time
  // comes from timestamps: a late tick (background tab) still counts it all,
  // and a pause keeps the part of a second already played.
  useEffect(() => {
    if (status !== "playing") return;

    const id = setTimeout(
      () => dispatch({ type: "tick", payload: { now: performance.now() } }),
      1_000 - (elapsedMs % 1_000),
    );
    return () => clearTimeout(id);
  }, [status, elapsedMs]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
