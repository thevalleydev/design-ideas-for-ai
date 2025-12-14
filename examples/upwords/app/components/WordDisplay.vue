<template>
  <div 
    class="flex items-center justify-between py-3 px-5 rounded-2xl shadow-lg transition-all duration-300"
    :class="containerClass"
  >
    <div class="word-display text-xl tracking-wider flex gap-0.5">
      <span 
        v-for="(letter, i) in letters" 
        :key="i"
        class="relative inline-block transition-all duration-200"
        :class="letter.isReused ? 'reused-letter' : 'text-gray-800 dark:text-white'"
      >
        {{ letter.char }}
      </span>
    </div>
    
    <!-- Points display with animation -->
    <Transition name="score-pop">
      <div 
        v-if="showPoints && points > 0" 
        class="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-500/30"
      >
        <span class="text-white font-bold text-lg">+{{ points }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  word: string
  points: number
  reusedLetters: string[]
  isLatest: boolean
  showPoints?: boolean
}>()

const letters = computed(() => {
  return props.word.split('').map(char => ({
    char: char.toUpperCase(),
    isReused: props.reusedLetters.includes(char.toUpperCase())
  }))
})

const containerClass = computed(() => {
  if (props.isLatest) {
    return 'bg-white dark:bg-white/10 ring-2 ring-purple-400 dark:ring-cyan-400/50 shadow-purple-200 dark:shadow-cyan-500/20'
  }
  return 'bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10'
})
</script>

<style scoped>
.score-pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.score-pop-leave-active {
  transition: all 0.3s ease-out;
}

.score-pop-enter-from {
  opacity: 0;
  transform: scale(0.5) translateX(20px);
}

.score-pop-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}
</style>
