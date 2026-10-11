import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { MotionConfig } from "motion/react";
import { GameProvider } from "@/contexts/GameProvider";
import Game from "@/pages/Game";
import Start from "@/pages/Start";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="start" />} />
            <Route path="/start" element={<Start />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </MotionConfig>
  );
}
