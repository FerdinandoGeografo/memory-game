# Frontend Mentor - Memory game solution

This is a solution to the [Memory game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How it works](#how-it-works)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the Memory game either solo or multiplayer (up to 4 players)
- Set the theme to use numbers or icons within the tiles
- Choose to play on either a 6x6 or 4x4 grid

### Screenshots

![Four-player game on a 6x6 icon board](./screenshots/desktop.png)
![Solo game on a 4x4 number board, mobile](./screenshots/mobile.png)
![Multiplayer results dialog with the winner highlighted](./screenshots/results.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/FerdinandoGeografo/memory-game)
- Live site URL: [Memory Game](https://memory-game-fg.vercel.app/)

## My process

### Built with

- Semantic HTML
- Mobile-first layout with Tailwind CSS 4 utilities, CSS Grid and Flexbox, and design tokens in `@theme`
- [React 19](https://react.dev/) with TypeScript (strict), Context + `useReducer` and the [React Compiler](https://react.dev/learn/react-compiler)
- [Vite](https://vite.dev/) - build tool and dev server
- [React Router](https://reactrouter.com/)
- [Base UI](https://base-ui.com/) components through local [shadcn](https://ui.shadcn.com/) wrappers - buttons, toggle groups and dialogs
- [Motion](https://motion.dev/) - tile flips, board entrance, dialogs and the current-turn highlight
- [Font Awesome](https://fontawesome.com/) - tile icons
- [class-variance-authority](https://cva.style/) - typed style variants for Tailwind classes

### How it works

- **State**: one reducer (`src/contexts/game-reducer.ts`) holds the board, players, turn, moves and clock, and accepts setup changes only between games. Every user action goes through `useGameActions` (`src/hooks/useGameActions.ts`), which creates the shuffled board and the timestamps when the event happens, so the reducer stays pure; only the provider's own timers dispatch the clock tick and the pair resolution.
- **Derived values**: the results summary and the screen-reader announcements are pure functions of the state (`src/utils`), recomputed whenever the context re-renders their component.
- **Board**: every new board draws its values at random, 8 pairs on 4x4 and 18 on 6x6, from the numbers 0-99 or from 40 icons.
- **Matching**: after the second tile, the provider waits (longer on a mismatch, so the value can be read), then resolves the pair. The resolution carries a round id, so a check left over from a restarted game is ignored. Pausing freezes the check; resuming starts it again.
- **Clock**: play time is counted from `performance.now()` timestamps, so pauses keep the part of a second already played and a background tab still counts real time. The last pair stops it.
- **Navigation**: `/game` without a game in progress redirects to `/start`. Going back to the setup screen ends the current game, so Forward never shows an old board with new options. Every route change starts from the top of the page.
- **Reduced motion**: `MotionConfig reducedMotion="user"` makes flips, scaling and travel instant when the system asks for reduced motion; short fades remain.
- **Styles**: styles with several variants or combinations (buttons, stats, board, tile faces) are cva definitions in `src/constants`, or next to their wrapper in `src/ui`; those that depend on two props at once, like the stats' top margin by mode and grid size, use `compoundVariants`. Simple two-state cases, like the logo color, stay plain conditional classes.

  ```ts
  const statHighlightVariants = cva("absolute inset-0 -z-10", {
    variants: {
      highlight: { turn: "bg-orange-500", winner: "bg-blue-800" },
    },
  });

  statHighlightVariants({ highlight: "turn" });
  ```

### What I learned

- Code-splitting two routes was not worth it here: the start screen preloaded the game page anyway.
- On Restart the old board fades out while the new one waits. Tile ids repeat across rounds, so each tile reads Motion's `useIsPresent` and turns `inert` while its board leaves: no clicks, no returning focus.
- Counting time from timestamps rather than ticks keeps the part of a second played before a pause, while a plain 1s interval is enough to refresh the display.
- The React Compiler kept the tiles from re-rendering on each clock tick without splitting the context.

### Useful resources

- [Scaling up with reducer and context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Base UI: animation](https://base-ui.com/react/handbook/animation)
- [Motion: accessibility](https://motion.dev/docs/react-accessibility)

### AI Collaboration

I used [Claude Code](https://claude.com/claude-code) mainly as a reviewer. Most of the work went into setting up its context: a `CLAUDE.md` with the working agreement, rules for state, UI primitives, motion and verification, a design reference taken from the Figma file, and a few skills (Motion, shadcn, Vercel's React best practices and web design guidelines). With that in place, it reviewed code, accessibility and design fidelity, checking its findings in the running app.

## Author

- Frontend Mentor - [@FerdinandoGeografo](https://www.frontendmentor.io/profile/FerdinandoGeografo)
- LinkedIn - [@FerdinandoGeografo](https://www.linkedin.com/in/ferdinandogeografo/)
- GitHub - [@FerdinandoGeografo](https://github.com/FerdinandoGeografo/)
