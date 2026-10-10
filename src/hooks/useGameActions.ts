import { useNavigate } from "react-router";
import { generateBoard } from "@/utils/helpers";
import useGame from "./useGame";

// Game flow actions used by pages and dialogs. Randomness (the shuffled board)
// and timestamps are created here, at event time, so the reducer stays pure.
export default function useGameActions() {
  const {
    state: { config },
    dispatch,
  } = useGame();
  const navigate = useNavigate();

  return {
    start() {
      dispatch({
        type: "start",
        payload: {
          board: generateBoard(config.gridSize),
          now: performance.now(),
        },
      });
      navigate("/game");
    },
    restart() {
      dispatch({
        type: "restart",
        payload: {
          board: generateBoard(config.gridSize),
          now: performance.now(),
        },
      });
    },
    newGame() {
      dispatch({ type: "quit" });
      navigate("/start");
    },
    pause() {
      dispatch({ type: "pause", payload: { now: performance.now() } });
    },
    resume() {
      dispatch({ type: "resume", payload: { now: performance.now() } });
    },
  };
}
