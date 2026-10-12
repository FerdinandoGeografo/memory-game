import { initialState } from "@/constants/initial-state";
import type { GameAction, GameState } from "@/types/game";
import { generatePlayers, getFlippedTiles } from "@/utils/board";

function elapsedAt(state: GameState, now: number) {
  return state.runningSince === null
    ? state.elapsedMs
    : state.elapsedMs + now - state.runningSince;
}

function hasStarted(state: GameState) {
  return state.moves > 0 || state.board.some((t) => t.state !== "covered");
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "setConfig":
      if (state.status !== "idle") return state;
      return { ...state, config: { ...state.config, ...action.payload } };

    case "start":
    case "restart":
      return {
        ...initialState,
        config: state.config,
        status: "playing",
        board: action.payload.board,
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
      const selectedTiles = getFlippedTiles(newBoard);

      return {
        ...state,
        board: newBoard,
        runningSince:
          state.runningSince ??
          (state.players.length === 1 ? action.payload.now : null),
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

      const flipped = getFlippedTiles(state.board);
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
        ? {
            ...state,
            status: "playing",
            runningSince:
              state.players.length === 1 && hasStarted(state)
                ? action.payload.now
                : null,
          }
        : state;

    case "tick":
      return state.status === "playing" && state.runningSince !== null
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
