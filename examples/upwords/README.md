# UpWord

A word chain puzzle game built with Nuxt 4 + Nuxt UI v4.

![UpWord Screenshot](screenshot.png)

## The Game

Chain words together! Each new word must reuse at least 2 letters from the previous word.

- **60 second timer** — Race against the clock
- **Score points** — Longer words and more reused letters = more points
- **Dark/Light theme** — Automatic system detection + manual toggle

## Instructions Used

This app was built using:
- [nuxt-ui-v4.md](../../foundations/nuxt-ui-v4.md) — Foundation
- [puzzle-game.md](../../archetypes/puzzle-game.md) — Archetype

## Run Locally

```bash
cd examples/upwords
npm install
npm run dev -- --host
```

Then open http://localhost:3000

## Features Demonstrated

- ✅ Custom on-screen keyboard
- ✅ Dark/light theme with system preference
- ✅ Glassmorphism design
- ✅ Timer with urgency states
- ✅ Animated word chain (TransitionGroup)
- ✅ Score animations
- ✅ Desktop keyboard support
- ✅ Mobile-optimized layout

## Components

| Component | Purpose |
|-----------|---------|
| `GameHeader.vue` | Timer, logo, score, theme toggle |
| `StartingWord.vue` | Today's starting word |
| `WordChain.vue` | Animated list of submitted words |
| `WordDisplay.vue` | Individual word with highlighted letters |
| `CurrentInput.vue` | Active typing area with validation |
| `GameKeyboard.vue` | Custom QWERTY keyboard |
| `CollapseZone.vue` | Hidden word count indicator |
| `ScorePopup.vue` | Floating score animation |

## Tech Stack

- Nuxt 4.2
- Nuxt UI v4 (includes Tailwind v4)
- Vue 3.5
- TypeScript
