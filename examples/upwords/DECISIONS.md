# UpWord Development Decisions

> Key decisions made while building UpWord, a word chain puzzle game.

## Goal

Build a Wordle-like word chain game where:
- Players chain words together
- Each word must reuse 2+ letters from the previous word
- 60 second time limit
- Score based on word length + reused letters

---

## Decision: Wordle-Style Keyboard

**Why:** Wordle has trained millions of users on this exact keyboard layout. The QWERTY layout with ENTER on the left and backspace on the right is now familiar.

**Implementation:**
- Custom `GameKeyboard.vue` component
- ENTER on left of bottom row, DELETE on right
- Highlighted keys show available letters from previous word
- Solid background (not glass) for clarity

**Alternative considered:** Native mobile keyboard
**Rejected because:** Causes viewport issues, can't highlight keys, inconsistent across devices

---

## Decision: Chain Animation (Yank Effect)

**Why:** Needed visual feedback showing words "joining" the chain. The yank animation makes it feel like words are being pulled up.

**Implementation:**
- `chain-yank` TransitionGroup animation
- New word enters from below (100px down, scale 0.8)
- Old word exits upward (-150px, scale 0.6) 
- Accelerating exit creates "pulled away" feeling

**Key insight:** Using `position: absolute` on leave-active prevents layout jumps.

---

## Problem: Words Hidden by Keyboard

**Symptom:** Word chain was scrollable in the middle, but keyboard covered the bottom. Latest word often hidden.

**Solution:** Fixed positioning for all major sections:
```
Header: fixed top-0
Latest word: fixed top-20  
Current input: fixed bottom-56
Keyboard: fixed bottom-0
```

**Key insight:** Treat it like a mobile app with fixed chrome, not a scrollable webpage.

---

## Problem: Double-Tap Zoom on Mobile

**Symptom:** Rapidly tapping keyboard keys triggered iOS zoom gesture.

**Solution:** Global CSS rule:
```css
* {
  touch-action: manipulation;
}
```

This disables double-tap zoom while preserving pinch zoom and scroll.

---

## Decision: Show Only Latest Word

**Why:** Showing the full scrollable word chain was visually cluttered and the latest word often got hidden behind the keyboard.

**Implementation:**
- Only render `latestWord` (last item in array)
- Visual chain connector (decorative line + circles) links to header
- Word count shown in header if needed

**Alternative considered:** Scrollable word list
**Rejected because:** Took focus away from current input, hard to position correctly with fixed keyboard

---

## Decision: Starting Word Collapses

**Why:** The starting word (e.g., "GARDEN") needs to be prominent at game start, but should get out of the way once playing.

**Implementation:**
- `StartingWord.vue` shown only when `wordChain.length === 0`
- Collapse animation on first word entry
- Starting word moves to small text in header

---

## Decision: Theme-Aware Accent Colors

**Why:** Purple works great in light mode but doesn't pop in dark mode.

**Implementation:**
- Light mode: Purple (`#7c3aed`) for highlights
- Dark mode: Cyan (`#22d3ee`) for highlights
- Consistent green for success states

---

## Decision: No Word Validation API

**Why:** MVP focus — wanted to test the core mechanics first.

**Tradeoff:** Players can enter nonsense words. Future version could add dictionary validation.

---

## Scoring System

```
points = (word.length × 2) + (reusedLetters × 3)
```

**Why this formula:**
- Rewards longer words (creativity)
- Rewards more reused letters (following the constraint)
- Simple enough to understand quickly

---

## File Structure

```
app/
├── pages/index.vue          # Game logic + state
├── components/
│   ├── GameHeader.vue       # Timer, logo, score
│   ├── StartingWord.vue     # Initial word display
│   ├── WordDisplay.vue      # Individual word card
│   ├── CurrentInput.vue     # Active typing area
│   ├── GameKeyboard.vue     # QWERTY keyboard
│   └── ScorePopup.vue       # Floating +points
└── assets/css/main.css      # Glassmorphism, animations
```

---

## What Worked Well

1. **Fixed positioning everywhere** — Predictable layout on all devices
2. **Custom keyboard** — Full control, no viewport surprises
3. **Chain yank animation** — Satisfying visual feedback
4. **Theme-aware accents** — Looks polished in both modes

## What Could Be Improved

1. **Word validation** — Add dictionary API
2. **Difficulty levels** — Require 3+ letters, shorter time
3. **Daily challenge** — Same starting word for everyone
4. **Share results** — Wordle-style emoji grid
