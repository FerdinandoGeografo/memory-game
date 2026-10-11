import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { MotionConfig } from "motion/react";
import GameProvider from "@/contexts/GameProvider";
import Game from "@/pages/Game";
import Start from "@/pages/Start";

export default function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <Routes>
          <Route index element={<Navigate replace to="start" />} />
          <Route path="/start" element={<Start />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </GameProvider>
    </MotionConfig>
  );
}
