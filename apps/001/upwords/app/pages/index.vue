<template>
  <div class="game-container min-h-screen flex flex-col">
    <!-- Header -->
    <GameHeader :time="timeRemaining" :score="score" />
    
    <!-- Starting Word -->
    <StartingWord :word="startingWord" />
    
    <!-- Main game area -->
    <main class="flex-1 flex flex-col pt-36 pb-72">
      <!-- Collapse zone -->
      <CollapseZone :hidden-count="hiddenWordCount" />
      
      <!-- Word chain -->
      <WordChain :words="visibleWords" :previous-word="previousWord" />
    </main>
    
    <!-- Current input -->
    <CurrentInput 
      :letters="currentInputLetters" 
      :is-valid="isCurrentInputValid"
      :previous-word="previousWord"
    />
    
    <!-- Keyboard -->
    <GameKeyboard 
      @key-press="handleKeyPress"
      @backspace="handleBackspace"
      @submit="handleSubmit"
      :can-submit="canSubmit"
      :highlighted-letters="availableLetters"
    />
    
    <!-- Score popup -->
    <ScorePopup :message="scoreMessage" :visible="showScorePopup" />
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

// Game state
const startingWord = ref('GARDEN')
const currentInput = ref('')
const score = ref(0)
const timeRemaining = ref(60)

const wordChain = ref<WordEntry[]>([])

// Timer
let timerInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    }
  }, 1000)
  
  window.addEventListener('keydown', handlePhysicalKeyboard)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
  window.removeEventListener('keydown', handlePhysicalKeyboard)
})

// Computed properties
const visibleWords = computed(() => wordChain.value.slice(-4))
const hiddenWordCount = computed(() => Math.max(0, wordChain.value.length - 4))
const previousWord = computed(() => wordChain.value[wordChain.value.length - 1]?.text || startingWord.value)

// Available letters from previous word (for keyboard highlighting)
const availableLetters = computed(() => {
  return [...new Set(previousWord.value.toUpperCase().split(''))]
})

const currentInputLetters = computed(() => {
  const prev = previousWord.value.toUpperCase()
  const prevLetters = [...prev]
  
  return currentInput.value.split('').map(char => {
    const upperChar = char.toUpperCase()
    const idx = prevLetters.indexOf(upperChar)
    const isReused = idx !== -1
    if (isReused) {
      prevLetters.splice(idx, 1) // Remove used letter
    }
    return { char: upperChar, isReused }
  })
})

const reusedCount = computed(() => {
  return currentInputLetters.value.filter(l => l.isReused).length
})

const isCurrentInputValid = computed(() => reusedCount.value >= 2)
const canSubmit = computed(() => currentInput.value.length >= 2 && isCurrentInputValid.value && timeRemaining.value > 0)

// Score popup state
const scoreMessage = ref('')
const showScorePopup = ref(false)

// Handlers
function handleKeyPress(key: string) {
  if (timeRemaining.value <= 0) return
  currentInput.value += key.toUpperCase()
}

function handleBackspace() {
  currentInput.value = currentInput.value.slice(0, -1)
}

function handleSubmit() {
  if (!canSubmit.value) return
  
  const points = currentInput.value.length * 2 + reusedCount.value * 3
  
  const newWord: WordEntry = {
    id: Date.now(),
    text: currentInput.value.toUpperCase(),
    points,
    reusedLetters: currentInputLetters.value
      .filter(l => l.isReused)
      .map(l => l.char),
    showPoints: true
  }
  
  wordChain.value.push(newWord)
  
  score.value += points
  scoreMessage.value = `+${points}`
  showScorePopup.value = true
  
  // Hide score popup after animation
  setTimeout(() => {
    showScorePopup.value = false
  }, 1200)
  
  // Hide points on word card after delay
  setTimeout(() => {
    const word = wordChain.value.find(w => w.id === newWord.id)
    if (word) word.showPoints = false
  }, 2000)
  
  currentInput.value = ''
}

// Desktop keyboard support
function handlePhysicalKeyboard(e: KeyboardEvent) {
  if (e.key === 'Backspace') {
    e.preventDefault()
    handleBackspace()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    handleKeyPress(e.key)
  }
}
</script>
