# Nuxt UI v4 Foundation

> Complete setup for Nuxt 4 + Nuxt UI v4 with dark/light theming, glassmorphism, animations, and mobile-first patterns.

## Overview

This foundation provides everything you need for a polished, mobile-first web app:
- Nuxt 4 with Nuxt UI v4 (includes Tailwind v4)
- Automatic dark/light theme with system preference detection
- Glassmorphism design patterns
- Animation library for feedback and delight
- Safe area handling for mobile devices
- VS Code MCP integration for AI-assisted development

**Use this foundation for:** Any Nuxt-based web app that needs a modern, polished UI.

---

## ⚠️ Critical: Version Rules

### Always Use Latest Versions

**Before installing, check the official docs:**
- Nuxt: https://nuxt.com/docs/getting-started/installation
- Nuxt UI: https://ui.nuxt.com/getting-started/installation

### Common Mistakes

| ❌ Don't | ✅ Do |
|----------|-------|
| Install `nuxt@3` | Install `nuxt@latest` (currently v4) |
| Install `@nuxtjs/tailwindcss` | Nuxt UI v4 includes Tailwind v4 |
| Install `@nuxtjs/color-mode` | Nuxt UI v4 includes color-mode |
| Define duplicate CSS classes | Search file before adding new classes |

---

## Setup

### 1. Create Project

```bash
# Create new Nuxt project with UI template
npm create nuxt@latest my-app -- -t ui

cd my-app
npm install
```

### 2. Verify Versions

```bash
# Should show nuxt@4.x and @nuxt/ui@4.x
cat package.json | grep -E '"nuxt"|"@nuxt/ui"'
```

### 3. Configure nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'My App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ]
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-12-13'
})
```

### 4. Create app/app.vue

```vue
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

### 5. Create app/assets/css/main.css

```css
@import "tailwindcss";
@import "@nuxt/ui";

/* ========================================
   THEME BACKGROUNDS
   ======================================== */

html, body {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Light mode - soft gradient */
html, body {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

/* Dark mode - deep gradient */
.dark html, .dark body,
html.dark, body.dark,
:root.dark {
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
}

/* ========================================
   GLASSMORPHISM
   ======================================== */

/* Light mode glass */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Dark mode glass */
.dark .glass {
  background: rgba(30, 30, 50, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

/* Subtle variant */
.glass-subtle {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .glass-subtle {
  background: rgba(255, 255, 255, 0.05);
}

/* ========================================
   SAFE AREAS (iPhone notch, etc.)
   ======================================== */

.pb-safe {
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}

.pt-safe {
  padding-top: max(12px, env(safe-area-inset-top));
}

/* ========================================
   ANIMATIONS
   ======================================== */

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes pulse-warning {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.animate-pulse-warning {
  animation: pulse-warning 0.8s ease-in-out infinite;
}

@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-bounce-in {
  animation: bounce-in 0.4s ease-out;
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.7); }
}

.animate-glow {
  animation: glow-pulse 1.5s ease-in-out infinite;
}

/* ========================================
   UTILITY CLASSES
   ======================================== */

/* Prevent text selection (for games, interactive UIs) */
.no-select {
  user-select: none;
  -webkit-user-select: none;
}

/* Prevent pull-to-refresh on mobile */
.no-overscroll {
  overscroll-behavior: none;
}
```

### 6. VS Code MCP Configuration

Create `.vscode/mcp.json` at workspace root:

```json
{
  "servers": {
    "nuxt-ui": {
      "type": "http",
      "url": "https://ui.nuxt.com/mcp"
    }
  }
}
```

This enables AI access to Nuxt UI component documentation.

---

## Theme System

### Built-in Color Mode

Nuxt UI includes `@nuxtjs/color-mode`. Use these components:

```vue
<!-- Simple toggle button -->
<UColorModeButton />

<!-- Switch -->
<UColorModeSwitch />

<!-- Dropdown with system option -->
<UColorModeSelect />
```

### Theme-Aware Classes

Use Tailwind's `dark:` prefix for theme-specific styles:

```vue
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-800 dark:text-white">
    This adapts to the theme
  </p>
</div>
```

### Custom Theme Colors

Define colors that change with theme:

```css
/* Light mode */
.accent-text {
  color: #7c3aed; /* purple */
}

/* Dark mode */
.dark .accent-text {
  color: #22d3ee; /* cyan */
}
```

---

## Common Patterns

### Fixed Header + Footer Layout

```vue
<template>
  <div class="min-h-screen">
    <!-- Fixed header -->
    <header class="fixed top-0 left-0 right-0 h-16 glass z-50">
      <!-- header content -->
    </header>
    
    <!-- Scrollable content with padding for fixed elements -->
    <main class="pt-16 pb-20">
      <!-- main content -->
    </main>
    
    <!-- Fixed footer -->
    <footer class="fixed bottom-0 left-0 right-0 glass pb-safe z-50">
      <!-- footer content -->
    </footer>
  </div>
</template>
```

### Centered Container

```vue
<div class="max-w-lg mx-auto px-4">
  <!-- Content centered and constrained -->
</div>
```

### Glass Card

```vue
<div class="glass rounded-2xl p-6 shadow-xl">
  <!-- Card content -->
</div>
```

---

## Animation Reference

| Class | Use Case | Duration |
|-------|----------|----------|
| `animate-shake` | Error feedback | 400ms |
| `animate-pulse-warning` | Urgency (low timer) | 800ms infinite |
| `animate-bounce-in` | Element appearing | 400ms |
| `animate-slide-up` | Content entering | 300ms |
| `animate-glow` | Success/highlight | 1.5s infinite |

### Vue Transitions

```vue
<template>
  <Transition name="fade">
    <div v-if="show">Content</div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### TransitionGroup for Lists

```vue
<template>
  <TransitionGroup name="list" tag="div">
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
  </TransitionGroup>
</template>

<style>
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

## Mobile Testing

Run the dev server with network access:

```bash
npm run dev -- --host
```

This exposes the server on your local network (e.g., `http://192.168.x.x:3000`).

---

## Lessons Learned

1. **Nuxt UI v4 bundles Tailwind v4** — Never install Tailwind separately
2. **Check for duplicate CSS classes** — Later definitions override earlier ones
3. **Glass morphism needs different opacity per theme** — Light: 80% white, Dark: 80% dark
4. **Use `--host` flag** — Essential for testing on real mobile devices
5. **TransitionGroup needs unique keys** — Combine multiple values if needed
6. **Ring utilities for validation** — `ring-4 ring-emerald-400` for focus-like borders

---

## Checklist

- [ ] Project scaffolded with `npm create nuxt@latest . -- -t ui`
- [ ] Verified Nuxt 4.x and Nuxt UI 4.x in package.json
- [ ] Created main.css with theme backgrounds and glass classes
- [ ] Created app.vue with UApp wrapper
- [ ] VS Code MCP config added
- [ ] Theme toggle added to UI
- [ ] Tested on mobile with `--host`
