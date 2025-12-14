<template>
  <div class="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-white/20 pt-3 pb-safe z-50 shadow-2xl">
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
          @click="handleKeyPress(key)"
          class="keyboard-key"
          :class="getKeyClass(key)"
        >
          {{ key }}
        </button>
      </div>
      
      <!-- Bottom row: special keys -->
      <div class="flex gap-2 px-2 mt-3">
        <button 
          @click="$emit('backspace')"
          class="keyboard-key flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/15 dark:hover:bg-white/25 dark:active:bg-white/30"
        >
          <UIcon name="i-lucide-delete" class="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        
        <button 
          @click="handleSubmit"
          class="keyboard-key flex-[3] font-bold text-lg transition-all duration-200"
          :class="submitClass"
          :disabled="!canSubmit"
        >
          <UIcon v-if="canSubmit" name="i-lucide-check" class="w-5 h-5 mr-1" />
          SUBMIT
        </button>
      </div>
      
      <!-- Desktop hint -->
      <p class="hidden lg:block text-center text-gray-400 dark:text-white/40 text-xs mt-3 pb-1">
        💡 Tip: Use your keyboard to type
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

function handleKeyPress(key: string) {
  emit('keyPress', key)
}

function handleSubmit() {
  if (props.canSubmit) {
    emit('submit')
  }
}

function getKeyClass(key: string) {
  const isHighlighted = props.highlightedLetters?.includes(key)
  if (isHighlighted) {
    return 'bg-purple-100 text-purple-700 ring-2 ring-purple-300 dark:bg-cyan-500/30 dark:text-cyan-300 dark:ring-cyan-400/50'
  }
  return 'bg-white text-gray-800 hover:bg-gray-50 dark:bg-white/15 dark:text-white dark:hover:bg-white/25'
}

const submitClass = computed(() => {
  if (props.canSubmit) {
    return 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-cyan-400/40 active:scale-95'
  }
  return 'bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-white/30 cursor-not-allowed'
})
</script>

<style scoped>
.keyboard-key {
  height: 52px;
  min-width: 30px;
  flex: 1;
  padding: 0 2px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05);
}

.keyboard-key:active:not(:disabled) {
  transform: scale(0.92);
}

.keyboard-key:disabled {
  cursor: not-allowed;
}
</style>
