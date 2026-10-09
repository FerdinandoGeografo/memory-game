import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";

export default function useGame() {
  const context = useContext(GameContext);
  if (context === null)
    throw new Error("GameContext was used outside GameProvider");

  return context;
}
