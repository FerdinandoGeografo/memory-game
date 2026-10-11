import { GameContext } from "@/contexts/game-context";
import { initialState } from "@/constants/initial-state";
import { MATCH_DELAY_MS, MISMATCH_DELAY_MS, TICK_MS } from "@/constants/timing";
import { gameReducer } from "@/contexts/game-reducer";
import { getFlippedTiles } from "@/utils/board";
import { useEffect, useReducer, type PropsWithChildren } from "react";

export default function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { status, isChecking, roundId, board } = state;

  const flipped = getFlippedTiles(board);
  const isPendingMatch =
    flipped.length === 2 && flipped[0].value === flipped[1].value;

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

  useEffect(() => {
    if (status !== "playing") return;

    const id = setInterval(
      () => dispatch({ type: "tick", payload: { now: performance.now() } }),
      TICK_MS,
    );
    return () => clearInterval(id);
  }, [status, roundId]);

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
