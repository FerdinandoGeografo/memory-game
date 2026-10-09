import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MotionConfig } from "motion/react";
import { GameProvider } from "@/contexts/GameProvider";
import { loadGamePage } from "@/pages/load-game-page";

// One chunk per page; Start preloads the Game chunk while the player chooses
const Start = lazy(() => import("@/pages/Start"));
const Game = lazy(loadGamePage);

export default function App() {
  return (
    // Reduced motion: transforms (flip, travel, scale) become instant, fades stay
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route index element={<Navigate replace to="start" />} />
              <Route path="/start" element={<Start />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </GameProvider>
    </MotionConfig>
  );
}
