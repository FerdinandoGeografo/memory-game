import Logo from "@/components/Logo";
import OptionGroup from "@/components/OptionGroup";
import {
  GRID_SIZE_OPTIONS,
  PLAYERS_OPTIONS,
  THEME_OPTIONS,
} from "@/constants/game-options";
import useGame from "@/hooks/useGame";
import useGameActions from "@/hooks/useGameActions";
import { fadeDown, fadeUp } from "@/lib/motion/variants";
import type { GameConfig } from "@/types/game";
import { Button } from "@/ui/button";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Start() {
  const {
    state: { config },
    dispatch,
  } = useGame();
  const { start } = useGameActions();

  // Coming back here (e.g. browser Back) pauses a game in progress.
  // dispatch is stable, so this runs once per visit.
  useEffect(() => {
    dispatch({ type: "pause" });
  }, [dispatch]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    start();
  }

  function setConfig(config: Partial<GameConfig>) {
    dispatch({ type: "setConfig", payload: config });
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-11.25 bg-blue-800 px-6 pt-20 pb-29 sm:gap-19.5 sm:pt-42.25 sm:pb-42 lg:pt-38.5 lg:pb-45.75">
      <motion.header variants={fadeDown()} initial="hidden" animate="visible">
        <Logo className="max-sm:text-4xl" />
      </motion.header>

      {/* The card rises, then each option group and the button in turn */}
      <motion.main
        variants={fadeUp({ step: 0.1, startDelay: 0.15 })}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-2xl flex-col rounded-xl bg-neutral-100 p-6 sm:p-14"
      >
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
          <Button
            type="submit"
            size="lg"
            className="mt-2 sm:mt-0"
            variants={fadeUp()}
          >
            Start Game
          </Button>
        </form>
      </motion.main>
    </div>
  );
}
