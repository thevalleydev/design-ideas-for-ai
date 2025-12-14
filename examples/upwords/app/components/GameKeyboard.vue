<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-200 dark:bg-zinc-800 pt-2 pb-safe z-50">
    <div class="max-w-lg mx-auto px-1.5">
      <!-- Letter rows - Wordle style -->
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
          @click="handleKeyPress(key)"
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
