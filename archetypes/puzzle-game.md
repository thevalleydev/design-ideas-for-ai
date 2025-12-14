# Puzzle Game Archetype

> Patterns for timed, mobile-first puzzle games with custom keyboards, animations, and engaging feedback.

**Prerequisites:** [nuxt-ui-v4.md](../foundations/nuxt-ui-v4.md)

## Overview

This archetype covers patterns for casual puzzle games:
- Custom on-screen keyboard (avoids mobile viewport issues)
- Timer with urgency states
- Score display with animations
- Smooth element transitions
- Touch-optimized interactions
- Engaging visual feedback

**Best for:** Word games, number puzzles, pattern matching, timed challenges.

---

## Screen Layout

```
┌─────────────────────────────┐
│  Header (fixed, glass)      │  64px
│  [Timer]  [Logo]  [Score]   │
├─────────────────────────────┤
│  Game Info (fixed)          │  ~80px
│  Level/Target/Starting word │
├─────────────────────────────┤
│  Game Area (scrollable)     │  Flex
│  Main puzzle content        │
├─────────────────────────────┤
│  Input Area (fixed)         │  ~80px
│  Current input/selection    │
├─────────────────────────────┤
│  Keyboard/Controls (fixed)  │  ~220px
│  Custom input controls      │
└─────────────────────────────┘
```

---

## Components

### GameHeader

Timer, logo, score, and theme toggle.

```vue
<template>
  <header class="fixed top-0 left-0 right-0 h-16 glass z-50 shadow-lg">
    <div class="flex items-center justify-between h-full px-4 max-w-lg mx-auto">
      <!-- Timer -->
      <div 
        class="flex items-center gap-2 px-4 py-2 rounded-full"
        :class="timerBgClass"
      >
        <UIcon name="i-lucide-clock" class="w-5 h-5" :class="timerColorClass" />
        <span class="game-stat text-xl" :class="timerColorClass">
          {{ formattedTime }}
        </span>
      </div>
      
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <span class="font-black text-xl tracking-widest bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          GAME NAME
        </span>
      </div>
      
      <!-- Score + Theme -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg">
          <span class="game-stat text-lg text-white">{{ score }}</span>
          <span class="text-white/80 text-xs">pts</span>
        </div>
        <UColorModeButton size="sm" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  time: number
  score: number
}>()

const formattedTime = computed(() => {
  const mins = Math.floor(props.time / 60)
  const secs = props.time % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// Timer urgency states
const timerColorClass = computed(() => {
  if (props.time <= 10) return 'text-red-500 dark:text-red-400 animate-pulse-warning'
  if (props.time <= 30) return 'text-orange-500 dark:text-orange-400'
  return 'text-gray-700 dark:text-white'
})

const timerBgClass = computed(() => {
  if (props.time <= 10) return 'bg-red-100 dark:bg-red-500/20 ring-1 ring-red-300 dark:ring-red-500/50'
  if (props.time <= 30) return 'bg-orange-100 dark:bg-orange-500/20 ring-1 ring-orange-300 dark:ring-orange-500/50'
  return 'bg-gray-100 dark:bg-white/10 ring-1 ring-gray-200 dark:ring-white/20'
})
</script>
```

### Custom Keyboard

Avoids native keyboard viewport issues on mobile.

```vue
<template>
  <div class="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-white/20 pt-3 pb-safe z-50">
    <div class="max-w-lg mx-auto px-2">
      <!-- Letter rows -->
      <div 
        v-for="(row, rowIndex) in keyboardRows" 
        :key="rowIndex" 
        class="flex justify-center gap-1.5 mb-1.5"
        :class="{ 'px-3': rowIndex === 1, 'px-6': rowIndex === 2 }"
      >
        <button
          v-for="key in row"
          :key="key"
          @click="$emit('keyPress', key)"
          class="keyboard-key"
          :class="getKeyClass(key)"
        >
          {{ key }}
        </button>
      </div>
      
      <!-- Action row -->
      <div class="flex gap-2 px-2 mt-3">
        <button 
          @click="$emit('backspace')"
          class="keyboard-key flex-1 bg-gray-100 dark:bg-white/15"
        >
          <UIcon name="i-lucide-delete" class="w-6 h-6" />
        </button>
        
        <button 
          @click="$emit('submit')"
          class="keyboard-key flex-[3] font-bold"
          :class="submitClass"
          :disabled="!canSubmit"
        >
          SUBMIT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  canSubmit: boolean
  highlightedKeys?: string[]
}>()

defineEmits<{
  keyPress: [key: string]
  backspace: []
  submit: []
}>()

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

function getKeyClass(key: string) {
  const isHighlighted = props.highlightedKeys?.includes(key)
  if (isHighlighted) {
    return 'bg-purple-100 text-purple-700 ring-2 ring-purple-300 dark:bg-cyan-500/30 dark:text-cyan-300 dark:ring-cyan-400/50'
  }
  return 'bg-white text-gray-800 dark:bg-white/15 dark:text-white'
}

const submitClass = computed(() => {
  if (props.canSubmit) {
    return 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg active:scale-95'
  }
  return 'bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/30 cursor-not-allowed'
})
</script>

<style scoped>
.keyboard-key {
  height: 52px;
  min-width: 30px;
  flex: 1;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.keyboard-key:active:not(:disabled) {
  transform: scale(0.92);
}
</style>
```

### Animated List

For displaying game elements that add/remove dynamically.

```vue
<template>
  <div class="flex flex-col gap-2 px-4">
    <TransitionGroup name="item" tag="div" class="flex flex-col gap-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="glass rounded-xl p-4"
      >
        {{ item.content }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.item-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.item-leave-active {
  transition: all 0.3s ease-out;
}

.item-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.item-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.item-move {
  transition: transform 0.4s ease;
}
</style>
```

### Score Popup

Floating score animation on points earned.

```vue
<template>
  <Transition name="score-pop">
    <div 
      v-if="show"
      class="fixed top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-50"
    >
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-2xl shadow-xl">
        +{{ points }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.score-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.score-pop-leave-active {
  transition: all 0.8s ease-out;
}

.score-pop-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.5);
}

.score-pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -40px) scale(0.8);
}
</style>
```

---

## Typography

Add to your main.css:

```css
/* Large, bold, readable text for game elements */
.game-text {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Stable-width numbers for scores/timers */
.game-stat {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
```

---

## Validation States

Visual feedback for user input:

```vue
<script setup>
const inputClass = computed(() => {
  if (isEmpty) return 'border-gray-200 dark:border-white/20'
  if (isValid) return 'ring-4 ring-emerald-500 dark:ring-emerald-400'
  return 'ring-2 ring-orange-500 dark:ring-orange-400'
})
</script>
```

---

## Desktop Keyboard Support

Add physical keyboard support alongside custom keyboard:

```vue
<script setup>
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Backspace') {
    handleBackspace()
  } else if (e.key === 'Enter') {
    handleSubmit()
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    handleKeyPress(e.key.toUpperCase())
  }
}
</script>
```

---

## Timer Logic

```typescript
const timeRemaining = ref(60)
let timerInterval: NodeJS.Timeout | null = null

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      endGame()
    }
  }, 1000)
}

function endGame() {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  // Handle game over
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
```

---

## Touch Optimization

```css
/* Prevent accidental text selection during gameplay */
.game-container {
  user-select: none;
  -webkit-user-select: none;
}

/* Disable tap highlight on buttons */
button {
  -webkit-tap-highlight-color: transparent;
}

/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Color Palette

| State | Light Mode | Dark Mode | Use |
|-------|------------|-----------|-----|
| Valid/Success | `emerald-500` | `emerald-400` | Correct answers |
| Warning | `orange-500` | `orange-400` | Partial match |
| Error | `red-500` | `red-400` | Wrong, time critical |
| Highlight | `purple-500` | `cyan-400` | Special elements |
| Score | `amber-500` | `amber-500` | Points (same both) |

---

## File Structure

```
app/
├── assets/css/main.css
├── components/
│   ├── GameHeader.vue
│   ├── GameKeyboard.vue
│   ├── ScorePopup.vue
│   └── [game-specific components]
├── pages/
│   └── index.vue
└── app.vue
```

---

## Checklist

- [ ] Fixed header with timer, logo, score
- [ ] Custom on-screen keyboard
- [ ] Keyboard highlighted states
- [ ] Desktop keyboard support
- [ ] Timer with urgency colors (30s, 10s)
- [ ] Score animations
- [ ] Validation visual feedback
- [ ] Smooth list animations
- [ ] Touch-optimized (no select, tap targets)
- [ ] Works on mobile viewport
