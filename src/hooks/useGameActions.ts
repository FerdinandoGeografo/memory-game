import { useNavigate } from "react-router";
import useGame from "@/hooks/useGame";
import type { GameConfig } from "@/types/game";
import { generateBoard } from "@/utils/board";

export default function useGameActions() {
  const {
    state: { config },
    dispatch,
  } = useGame();
  const navigate = useNavigate();

  function setConfig(changes: Partial<GameConfig>) {
    dispatch({ type: "setConfig", payload: changes });
  }

  function start() {
    dispatch({
      type: "start",
      payload: { board: generateBoard(config) },
    });
    navigate("/game");
  }

  function restart() {
    dispatch({
      type: "restart",
      payload: { board: generateBoard(config) },
    });
  }

  function selectTile(tileId: number) {
    dispatch({
      type: "selectTile",
      payload: { tileId, now: performance.now() },
    });
  }

  function pause() {
    dispatch({ type: "pause", payload: { now: performance.now() } });
  }

  function resume() {
    dispatch({ type: "resume", payload: { now: performance.now() } });
  }

  function quit() {
    dispatch({ type: "quit" });
  }

  function newGame() {
    quit();
    navigate("/start");
  }

  return {
    setConfig,
    start,
    restart,
    selectTile,
    pause,
    resume,
    quit,
    newGame,
  };
}
