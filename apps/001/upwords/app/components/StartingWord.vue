<template>
  <div class="fixed top-16 left-0 right-0 z-40 px-4 pt-3">
    <div class="max-w-lg mx-auto">
      <div class="glass rounded-2xl px-6 py-4 shadow-xl">
        <div class="text-center">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Today's Word</span>
          <div class="word-display text-3xl mt-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  word: string
}>()
</script>
