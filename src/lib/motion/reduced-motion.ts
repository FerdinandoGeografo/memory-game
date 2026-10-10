import { MotionGlobalConfig } from "motion/react";

// With "reduce motion" on, every Motion animation jumps to its end state: no
// flips, travel, stagger or delays. Motion reads this flag on each animation,
// so a change of the setting applies at once, to elements already on screen
// too. (MotionConfig reducedMotion="user" is read once per element and only
// turns off transforms: fades and their delays would still play.)
export function followReducedMotionSetting() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => {
    MotionGlobalConfig.skipAnimations = query.matches;
  };

  sync();
  query.addEventListener("change", sync);
}
