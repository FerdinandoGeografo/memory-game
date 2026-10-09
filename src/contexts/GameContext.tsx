import { DEFAULT_GAME_CONFIG } from "@/constants/game-options";
import type { GameAction, GameState } from "@/types/game";
import { generateBoard, generatePlayers } from "@/utils/helpers";
import {
  createContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

const initialState: GameState = {
  config: DEFAULT_GAME_CONFIG,
  status: "idle",
  board: [],
  players: [],
  currentPlayerIndex: 0,
  isChecking: false,
  moves: 0,
  elapsedSeconds: 0,
  roundId: 0,
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "setConfig":
      return { ...state, config: { ...state.config, ...action.payload } };

    case "start":
    case "restart":
      return {
        ...initialState,
        config: state.config,
        status: "playing",
        board: generateBoard(state.config.gridSize),
        players: generatePlayers(state.config.players),
        roundId: state.roundId + 1,
      };

    case "selectTile": {
      if (state.status !== "playing" || state.isChecking) return state;

      const selectedTile = state.board.find(
        (t) => t.id === action.payload.tileId,
      );
      if (!selectedTile || selectedTile.state !== "covered") return state;

      const newBoard = state.board.map((t) =>
        t.id === selectedTile.id ? { ...t, state: "flipped" as const } : t,
      );
      const selectedTiles = newBoard.filter((t) => t.state === "flipped");

      return {
        ...state,
        board: newBoard,
        isChecking: selectedTiles.length === 2,
        moves: selectedTiles.length === 2 ? state.moves + 1 : state.moves,
      };
    }

    case "resolveMatch": {
      const [a, b] = action.payload.tiles;
      const match = a.value === b.value;
      const board = state.board.map((t) =>
        t.id === a.id || t.id === b.id
          ? { ...t, state: match ? ("matched" as const) : ("covered" as const) }
          : t,
      );

      const players = state.players.map((p, i) =>
        i === state.currentPlayerIndex
          ? { ...p, score: match ? p.score + 1 : p.score }
          : p,
      );

      const isComplete = board.every((t) => t.state === "matched");
      return {
        ...state,
        board,
        players,
        isChecking: false,
        status: isComplete ? "finished" : "playing",
        currentPlayerIndex: match
          ? state.currentPlayerIndex
          : (state.currentPlayerIndex + 1) % players.length,
      };
    }

    case "pause":
      return state.status === "playing"
        ? { ...state, status: "paused" }
        : state;

    case "resume":
      return state.status === "paused"
        ? { ...state, status: "playing" }
        : state;

    case "tick":
      return state.status === "playing"
        ? { ...state, elapsedSeconds: state.elapsedSeconds + 1 }
        : state;

    case "quit":
      return { ...initialState, config: state.config };

    default:
      throw new Error("Action type is unknown");
  }
}

function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

export { GameProvider, GameContext };
