import { MotionGlobalConfig } from "motion/react";

export function followReducedMotionSetting() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => {
    MotionGlobalConfig.skipAnimations = query.matches;
  };

  sync();
  query.addEventListener("change", sync);
}
