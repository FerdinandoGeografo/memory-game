import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { GameProvider } from "@/contexts/GameProvider";
import Game from "@/pages/Game";
import Start from "@/pages/Start";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="start" />} />
          <Route path="/start" element={<Start />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
