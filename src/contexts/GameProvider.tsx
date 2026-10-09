import { GameContext } from "@/contexts/game-context";
import { gameReducer, initialState } from "@/game/reducer";
import { useEffect, useReducer, type PropsWithChildren } from "react";

export function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { status, isChecking, roundId } = state;

  // Pausing clears the pending check; resuming schedules it again
  useEffect(() => {
    if (status !== "playing" || !isChecking) return;

    const check = setTimeout(() => {
      dispatch({ type: "resolveMatch", payload: { roundId } });
    }, 450);

    return () => clearTimeout(check);
  }, [status, isChecking, roundId]);

  useEffect(() => {
    if (status !== "playing") return;

    const id = setInterval(() => dispatch({ type: "tick" }), 1_000);
    return () => clearInterval(id);
  }, [status]);

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
