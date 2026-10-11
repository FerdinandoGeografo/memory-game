import type { GameContextValue } from "@/types/game";
import { createContext } from "react";

export const GameContext = createContext<GameContextValue | null>(null);
