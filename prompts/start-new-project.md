# Start New Project Prompt

> Copy this prompt to start a new project with an AI assistant.

---

## The Prompt

```
I want to build a [DESCRIBE YOUR APP].

Please read these instruction files from the design-instructions repo:
- foundations/[FOUNDATION].md - for tech stack setup
- archetypes/[ARCHETYPE].md - for app-type patterns

Then help me:
1. Set up the project following the foundation instructions
2. Create the core components following the archetype patterns
3. Apply the design patterns (glassmorphism, animations, etc.)

Let's start with project setup.
```

---

## How to Use

### 1. Describe your app
Replace `[DESCRIBE YOUR APP]` with a brief description:
- "a word puzzle game like Wordle"
- "an admin dashboard for managing users"
- "a todo list with categories"

### 2. Choose your foundation
Replace `[FOUNDATION]` with the relevant tech stack:
- `nuxt-ui-v4` — Nuxt 4 + Nuxt UI + Tailwind

### 3. Choose your archetype
Replace `[ARCHETYPE]` with the app type:
- `puzzle-game` — Timed games, word games, casual mobile games
- `dashboard` — Admin panels, analytics *(coming soon)*
- `landing-page` — Marketing sites *(coming soon)*

---

## Example Prompts

### Word Puzzle Game

```
I want to build a word puzzle game where players chain words together.
Each word must share at least 2 letters with the previous word.
60 second timer, score based on word length.

Please read these instruction files:
- foundations/nuxt-ui-v4.md
- archetypes/puzzle-game.md

Then help me set up the project and build the core game loop.
```

### Daily Challenge Game

```
I want to build a daily number puzzle game (like Wordle but with math).
Players guess a 5-digit number, getting hints after each guess.
One puzzle per day, shareable results.

Please read:
- foundations/nuxt-ui-v4.md
- archetypes/puzzle-game.md

Let's start with project setup, then build the guess input system.
```

---

## Tips for Best Results

1. **Be specific about core mechanics** — "chain words sharing 2 letters" is better than "word game"

2. **Mention mobile** — "mobile-first" or "works great on phones" helps prioritize touch

3. **Reference examples** — "similar to the UpWord example in this repo" gives concrete reference

4. **Start with setup** — Get the foundation working before building features

5. **Iterate component by component** — Build header, then input, then keyboard, etc.

---

## Quick Reference

### Available Foundations
| File | Tech Stack |
|------|------------|
| `nuxt-ui-v4.md` | Nuxt 4, Nuxt UI v4, Tailwind v4 |

### Available Archetypes
| File | Best For |
|------|----------|
| `puzzle-game.md` | Timed games, word games, mobile games |

### Available Patterns
| File | Pattern |
|------|---------|
| `glassmorphism.md` | Frosted glass UI effects |
| `animated-lists.md` | TransitionGroup animations |
| `wordle-keyboard.md` | Custom on-screen keyboard |
