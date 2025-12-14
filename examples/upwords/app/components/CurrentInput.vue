<template>
  <div class="fixed bottom-56 left-0 right-0 px-4 z-40">
    <div class="max-w-lg mx-auto">
      <div 
        class="flex items-center justify-center gap-1 px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 min-h-16"
        :class="containerClass"
      >
        <template v-if="letters.length > 0">
          <span 
            v-for="(letter, i) in letters" 
            :key="i"
            class="word-display text-3xl relative inline-block"
            :class="letter.isReused ? 'reused-letter' : 'text-gray-800 dark:text-white'"
          >
            {{ letter.char }}
          </span>
        </template>
        <span v-else class="text-gray-400 dark:text-white/40 text-lg font-medium">Type a word...</span>
        
        <!-- Cursor -->
        <span class="w-0.5 h-8 bg-purple-500 dark:bg-cyan-400 animate-pulse ml-1 rounded-full" />
      </div>
      
      <!-- Helper text -->
      <div class="text-center mt-2">
        <span 
          class="text-sm font-medium px-3 py-1 rounded-full"
          :class="helperClass"
        >
          {{ helperText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LetterDisplay {
  char: string
  isReused: boolean
}

const props = defineProps<{
  letters: LetterDisplay[]
  isValid: boolean
  previousWord: string
}>()

const reusedCount = computed(() => props.letters.filter(l => l.isReused).length)

const containerClass = computed(() => {
  if (props.letters.length === 0) return 'bg-white/90 dark:bg-white/10 border-2 border-gray-200 dark:border-white/20'
  if (props.isValid) return 'bg-white dark:bg-white/10 ring-4 ring-emerald-500 dark:ring-emerald-400/70 shadow-lg shadow-emerald-200 dark:shadow-emerald-500/20'
  return 'bg-white dark:bg-white/10 ring-2 ring-orange-500 dark:ring-orange-400/70 shadow-lg shadow-orange-200 dark:shadow-orange-500/20'
})

const helperText = computed(() => {
  if (props.letters.length === 0) return `Use 2+ letters from "${props.previousWord}"`
  if (props.isValid) return `✓ ${reusedCount.value} letters matched — Ready!`
  return `${reusedCount.value}/2 letters matched`
})

const helperClass = computed(() => {
  if (props.letters.length === 0) return 'bg-gray-200 dark:bg-white/30 text-gray-600 dark:text-white'
  if (props.isValid) return 'bg-green-500 text-white'
  return 'bg-orange-500 text-white'
})
</script>
