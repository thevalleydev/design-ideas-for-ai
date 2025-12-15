# Glassmorphism Pattern

> Frosted glass effect that adapts to light and dark themes.

## Overview

Glassmorphism creates a frosted glass look using backdrop blur and transparency. This pattern provides theme-aware glass styles that work in both light and dark modes.

**Use for:** Headers, cards, overlays, modals, floating UI elements.

---

## CSS Classes

Add to your `main.css`:

```css
/* ========================================
   GLASSMORPHISM
   ======================================== */

/* Standard glass - good for headers, cards */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .glass {
  background: rgba(30, 30, 50, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

/* Subtle glass - lighter effect for backgrounds */
.glass-subtle {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .glass-subtle {
  background: rgba(255, 255, 255, 0.05);
}
```

---

## Theme Backgrounds

Glass effects look best over gradient backgrounds:

```css
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
```

---

## Usage Examples

### Fixed Header

```vue
<template>
  <header class="fixed top-0 left-0 right-0 h-16 glass z-50 shadow-lg">
    <div class="flex items-center justify-between h-full px-4 max-w-lg mx-auto">
      <!-- Header content -->
    </div>
  </header>
</template>
```

### Glass Card

```vue
<template>
  <div class="glass rounded-2xl p-6 shadow-xl">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white">
      Card Title
    </h3>
    <p class="text-gray-600 dark:text-white/70 mt-2">
      Card content goes here.
    </p>
  </div>
</template>
```

### Fixed Footer

```vue
<template>
  <footer class="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-white/20 pb-safe z-50">
    <div class="max-w-lg mx-auto px-4 py-3">
      <!-- Footer content -->
    </div>
  </footer>
</template>
```

### Modal/Overlay

```vue
<template>
  <div class="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50">
    <div class="glass rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
      <h2 class="text-xl font-bold mb-4">Modal Title</h2>
      <p class="text-gray-600 dark:text-white/70">Modal content</p>
    </div>
  </div>
</template>
```

---

## Key Values

| Property | Light Mode | Dark Mode |
|----------|------------|-----------|
| Background | `rgba(255, 255, 255, 0.8)` | `rgba(30, 30, 50, 0.8)` |
| Blur | `20px` | `20px` |
| Border | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.1)` |
| Shadow opacity | `0.1` | `0.3` |

---

## Common Mistakes

| ❌ Don't | ✅ Do |
|----------|-------|
| Use same opacity for both themes | Use 80% white (light) and 80% dark (dark) |
| Forget `-webkit-backdrop-filter` | Include both for Safari support |
| Use glass without gradient background | Always use gradient backgrounds |
| Forget the border | Subtle border makes glass pop |

---

## Browser Support

- `backdrop-filter` requires `-webkit-` prefix for Safari
- Works in all modern browsers (Chrome, Safari, Firefox, Edge)
- Falls back to semi-transparent background if blur not supported
