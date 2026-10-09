import { GameContext } from "@/contexts/game-context";
import { gameReducer, initialState } from "@/game/reducer";
import { useEffect, useReducer, type PropsWithChildren } from "react";

export function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const flipped = state.board.filter((t) => t.state === "flipped");
    if (!state.isChecking || flipped.length !== 2) return;

    const [a, b] = flipped;
    const check = setTimeout(() => {
      dispatch({ type: "resolveMatch", payload: { tiles: [a, b] } });
    }, 450);

    return () => clearTimeout(check);
  }, [state.isChecking, state.board]);

  useEffect(() => {
    if (state.status !== "playing") return;

    const id = setInterval(() => dispatch({ type: "tick" }), 1_000);
    return () => clearInterval(id);
  }, [state.status]);

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
