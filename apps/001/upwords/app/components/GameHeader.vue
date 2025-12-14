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
      
      <!-- Logo/Title -->
      <div class="flex flex-col items-center">
        <span class="font-black text-xl tracking-widest bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          UPWORDS
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400 -mt-1">Word Chain</span>
      </div>
      
      <!-- Right side: Score + Theme toggle -->
      <div class="flex items-center gap-2">
        <!-- Score -->
        <div class="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/30">
          <span class="game-stat text-lg text-white">
            {{ score }}
          </span>
          <span class="text-white/80 text-xs font-medium">pts</span>
        </div>
        
        <!-- Theme toggle -->
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
