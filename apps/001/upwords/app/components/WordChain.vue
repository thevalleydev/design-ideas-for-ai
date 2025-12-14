<template>
  <div class="flex-1 flex flex-col justify-end gap-3 px-4 overflow-hidden">
    <TransitionGroup name="word-up">
      <WordDisplay 
        v-for="(word, index) in words" 
        :key="word.id"
        :word="word.text" 
        :points="word.points"
        :reused-letters="word.reusedLetters"
        :is-latest="index === words.length - 1"
        :show-points="word.showPoints"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
interface WordEntry {
  id: number
  text: string
  points: number
  reusedLetters: string[]
  showPoints?: boolean
}

defineProps<{
  words: WordEntry[]
  previousWord: string
}>()
</script>

<style scoped>
/* Upward animation for new words */
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
