# Animated Lists Pattern

> Vue TransitionGroup patterns for dynamic list animations.

## Overview

These patterns use Vue's `<TransitionGroup>` to animate items entering, leaving, and reordering. Includes several animation styles for different use cases.

**Use for:** Word chains, chat messages, notifications, todo lists, any dynamic list content.

---

## Basic List Animation

Standard enter/leave animation with move support:

```vue
<template>
  <TransitionGroup name="list" tag="div" class="flex flex-col gap-2">
    <div
      v-for="item in items"
      :key="item.id"
      class="glass rounded-xl p-4"
    >
      {{ item.content }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-move {
  transition: transform 0.4s ease;
}
</style>
```

---

## Chain Yank Animation

Items get "pulled up" as new items enter — great for word chains:

```vue
<template>
  <div class="relative">
    <TransitionGroup name="chain-yank">
      <div 
        v-for="item in items"
        :key="item.id"
        class="glass rounded-2xl p-4"
      >
        {{ item.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.chain-yank-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chain-yank-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  left: 0;
  right: 0;
}

.chain-yank-enter-from {
  opacity: 0;
  transform: translateY(100px) scale(0.8);
}

.chain-yank-leave-to {
  opacity: 0;
  transform: translateY(-150px) scale(0.6);
}
</style>
```

---

## Word Up Animation

Words slide up from below — good for stacking displays:

```vue
<template>
  <div class="flex flex-col gap-3 overflow-hidden">
    <TransitionGroup name="word-up">
      <div 
        v-for="(word, index) in words" 
        :key="word.id"
        class="glass rounded-2xl p-4 text-center"
      >
        {{ word.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.word-up-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.word-up-leave-active {
  transition: all 0.3s ease-out;
}

.word-up-enter-from {
  opacity: 0;
  transform: translateY(60px) scale(0.8);
}

.word-up-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.word-up-move {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
```

---

## Collapse Animation

Element collapses upward when removed — for hiding starting states:

```vue
<template>
  <Transition name="collapse">
    <div v-if="show" class="glass rounded-2xl p-6">
      Content that will collapse
    </div>
  </Transition>
</template>

<style scoped>
.collapse-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapse-leave-to {
  opacity: 0;
  transform: translateY(-60px) scale(0.8);
}
</style>
```

---

## Score Popup Animation

Floating score that rises and fades:

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

## Key Easing Functions

| Easing | Use Case |
|--------|----------|
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy enter (overshoot) |
| `ease-out` | Smooth exit |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth collapse |
| `cubic-bezier(0.4, 0, 1, 1)` | Accelerating exit |

---

## Important Tips

1. **Unique keys are essential** — Use IDs, not array indices
2. **Use `position: absolute` on leave** — Prevents layout jumps
3. **Set `overflow: hidden` on container** — Prevents items from showing outside bounds
4. **Match durations** — Keep enter/leave times similar for balance
5. **Add `.move` class** — Animate remaining items when one is removed

---

## Common Mistakes

| ❌ Don't | ✅ Do |
|----------|-------|
| Use array index as key | Use unique ID: `item.id` or `Date.now()` |
| Forget move transition | Add `.list-move { transition: transform }` |
| Leave orphaned items visible | Use `overflow: hidden` on container |
| Same timing for enter/leave | Faster leave (0.3s), slower enter (0.4s) |
