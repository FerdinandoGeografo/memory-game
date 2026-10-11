import { getAnnouncement } from "@/utils/announcement";
import useGame from "@/hooks/useGame";

export default function GameAnnouncer() {
  const { state } = useGame();

  return (
    <p role="status" className="sr-only">
      {getAnnouncement(state)}
    </p>
  );
}
