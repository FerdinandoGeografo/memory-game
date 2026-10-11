import { initialState } from "@/constants/initial-state";
import type { GameAction, GameState } from "@/types/game";
import { generatePlayers } from "@/utils/helpers";

function elapsedAt(state: GameState, now: number) {
  return state.runningSince === null
    ? state.elapsedMs
    : state.elapsedMs + now - state.runningSince;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "setConfig":
      return { ...state, config: { ...state.config, ...action.payload } };

    case "start":
    case "restart":
      return {
        ...initialState,
        config: state.config,
        status: "playing",
        board: action.payload.board,
        players: generatePlayers(state.config.players),
        runningSince: action.payload.now,
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
      if (
        state.status !== "playing" ||
        !state.isChecking ||
        action.payload.roundId !== state.roundId
      )
        return state;

      const flipped = state.board.filter((t) => t.state === "flipped");
      if (flipped.length !== 2) return state;

      const [a, b] = flipped;
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
        lastMatch: match,
        ...(isComplete && {
          status: "finished",
          elapsedMs: elapsedAt(state, action.payload.now),
          runningSince: null,
        }),
        currentPlayerIndex: match
          ? state.currentPlayerIndex
          : (state.currentPlayerIndex + 1) % players.length,
      };
    }

    case "pause":
      return state.status === "playing"
        ? {
            ...state,
            status: "paused",
            elapsedMs: elapsedAt(state, action.payload.now),
            runningSince: null,
          }
        : state;

    case "resume":
      return state.status === "paused"
        ? { ...state, status: "playing", runningSince: action.payload.now }
        : state;

    case "tick":
      return state.status === "playing"
        ? {
            ...state,
            elapsedMs: elapsedAt(state, action.payload.now),
            runningSince: action.payload.now,
          }
        : state;

    case "quit":
      if (state.status === "idle") return state;
      return { ...initialState, config: state.config, roundId: state.roundId };

    default: {
      const unhandled: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(unhandled)}`);
    }
  }
}
