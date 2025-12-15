# Wordle-Style Keyboard Pattern

> Custom on-screen QWERTY keyboard for mobile-first apps.

## Overview

A custom keyboard component that:
- Avoids mobile viewport issues with native keyboard
- Matches familiar Wordle layout
- Supports key highlighting (available letters)
- Includes submit and backspace actions
- Works alongside physical keyboard on desktop

**Use for:** Word games, PIN entry, custom input interfaces.

---

## Component

```vue
<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-200 dark:bg-zinc-800 pt-2 pb-safe z-50">
    <div class="max-w-lg mx-auto px-1.5">
      <!-- Letter rows -->
      <div 
        v-for="(row, rowIndex) in keyboardRows" 
        :key="rowIndex" 
        class="flex justify-center gap-1.5 mb-1.5"
      >
        <!-- Enter key on left of bottom row -->
        <button
          v-if="rowIndex === 2"
          @click="handleSubmit"
          class="keyboard-key keyboard-key-wide"
          :class="submitClass"
          :disabled="!canSubmit"
        >
          ENTER
        </button>
        
        <button
          v-for="key in row"
          :key="key"
          @click="$emit('keyPress', key)"
          class="keyboard-key"
          :class="getKeyClass(key)"
        >
          {{ key }}
        </button>
        
        <!-- Backspace on right of bottom row -->
        <button 
          v-if="rowIndex === 2"
          @click="$emit('backspace')"
          class="keyboard-key keyboard-key-wide bg-gray-300 dark:bg-zinc-600"
        >
          <UIcon name="i-lucide-delete" class="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
      </div>
      
      <!-- Desktop hint -->
      <p class="hidden lg:block text-center text-gray-400 dark:text-white/40 text-xs mt-2 pb-1">
        💡 Use your keyboard to type
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  canSubmit: boolean
  highlightedLetters?: string[]
}>()

const emit = defineEmits<{
  keyPress: [key: string]
  backspace: []
  submit: []
}>()

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

function handleSubmit() {
  if (props.canSubmit) {
    emit('submit')
  }
}

function getKeyClass(key: string) {
  const isHighlighted = props.highlightedLetters?.includes(key)
  if (isHighlighted) {
    return 'bg-emerald-500 text-white dark:bg-emerald-600'
  }
  return 'bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:text-white'
}

const submitClass = computed(() => {
  if (props.canSubmit) {
    return 'bg-emerald-500 text-white dark:bg-emerald-600'
  }
  return 'bg-gray-300 text-gray-500 dark:bg-zinc-600 dark:text-zinc-400 cursor-not-allowed'
})
</script>

<style scoped>
.keyboard-key {
  height: 58px;
  min-width: 32px;
  flex: 1;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  user-select: none;
}

.keyboard-key:active:not(:disabled) {
  opacity: 0.7;
}

.keyboard-key:disabled {
  cursor: not-allowed;
}

.keyboard-key-wide {
  flex: 1.5;
  font-size: 12px;
}
</style>
```

---

## CSS Requirements

Add to your `main.css`:

```css
/* Prevent double-tap zoom on buttons */
* {
  touch-action: manipulation;
}

/* Safe area for iPhone notch/home indicator */
.pb-safe {
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}
```

---

## Desktop Keyboard Support

Add physical keyboard handling in your parent component:

```vue
<script setup lang="ts">
onMounted(() => {
  window.addEventListener('keydown', handlePhysicalKeyboard)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handlePhysicalKeyboard)
})

function handlePhysicalKeyboard(e: KeyboardEvent) {
  if (e.key === 'Backspace') {
    e.preventDefault()
    handleBackspace()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    handleKeyPress(e.key.toUpperCase())
  }
}
</script>
```

---

## Usage Example

```vue
<template>
  <GameKeyboard 
    @key-press="handleKeyPress"
    @backspace="handleBackspace"
    @submit="handleSubmit"
    :can-submit="canSubmit"
    :highlighted-letters="availableLetters"
  />
</template>

<script setup lang="ts">
const currentInput = ref('')
const canSubmit = computed(() => currentInput.value.length >= 3)

// Letters from previous word that can be reused
const availableLetters = computed(() => {
  return [...new Set(previousWord.value.toUpperCase().split(''))]
})

function handleKeyPress(key: string) {
  currentInput.value += key
}

function handleBackspace() {
  currentInput.value = currentInput.value.slice(0, -1)
}

function handleSubmit() {
  if (!canSubmit.value) return
  // Process submission
  currentInput.value = ''
}
</script>
```

---

## Customization Options

### Different Highlight Colors

```typescript
function getKeyClass(key: string) {
  if (correctLetters.includes(key)) {
    return 'bg-emerald-500 text-white' // Correct position
  }
  if (presentLetters.includes(key)) {
    return 'bg-amber-500 text-white' // Wrong position
  }
  if (absentLetters.includes(key)) {
    return 'bg-gray-500 text-white' // Not in word
  }
  return 'bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:text-white'
}
```

### Glassmorphism Style

Replace solid background with glass:

```vue
<div class="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-white/20 pt-3 pb-safe z-50">
```

---

## Why Custom Keyboard?

| Problem with native keyboard | Custom keyboard solution |
|------------------------------|--------------------------|
| Viewport shrinks, hides content | Fixed position, predictable layout |
| Different across devices | Consistent QWERTY layout |
| Can't highlight keys | Full control over key styling |
| Hard to prevent zoom | `touch-action: manipulation` |
| Different submit behavior | Custom submit button |

---

## Key Dimensions

| Element | Size |
|---------|------|
| Key height | 58px |
| Key min-width | 32px |
| Gap between keys | 6px (gap-1.5) |
| Wide keys (Enter/Delete) | 1.5x normal width |
| Border radius | 4px |
