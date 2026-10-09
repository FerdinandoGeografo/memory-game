import Logo from "@/components/Logo";
import OptionGroup from "@/components/OptionGroup";
import {
  GRID_SIZE_OPTIONS,
  PLAYERS_OPTIONS,
  THEME_OPTIONS,
} from "@/constants/game-options";
import useGame from "@/hooks/useGame";
import { startGame } from "@/game/actions";
import type { GameConfig } from "@/types/game";
import { Button } from "@/ui/button";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export default function Start() {
  const navigate = useNavigate();
  const {
    state: { config },
    dispatch,
  } = useGame();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(startGame(config.gridSize));
    navigate("/game");
  }

  function setConfig(config: Partial<GameConfig>) {
    dispatch({ type: "setConfig", payload: config });
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-11.25 bg-blue-800 px-6 py-20 sm:gap-19.5 sm:px-0 sm:py-42.25 lg:py-38.5">
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Logo />
      </motion.header>

      <main className="flex w-full max-w-2xl flex-col rounded-xl bg-neutral-100 p-6 sm:p-14">
        <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleSubmit}>
          <OptionGroup
            label="Select Theme"
            value={config.theme}
            onChange={(theme) => setConfig({ theme })}
            options={THEME_OPTIONS}
          />
          <OptionGroup
            label="Number of Players"
            value={config.players}
            onChange={(players) => setConfig({ players })}
            options={PLAYERS_OPTIONS}
          />
          <OptionGroup
            label="Grid Size"
            value={config.gridSize}
            onChange={(gridSize) => setConfig({ gridSize })}
            options={GRID_SIZE_OPTIONS}
          />
          <Button type="submit" size="lg" className="mt-2 sm:mt-0">
            Start Game
          </Button>
        </form>
      </main>
    </div>
  );
}
