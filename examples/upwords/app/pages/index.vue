<template>
  <div class="game-container min-h-screen flex flex-col">
    <!-- Header -->
    <GameHeader 
      :time="timeRemaining" 
      :score="score" 
      :starting-word="startingWord"
      :show-starting-word="hasStartedPlaying"
    />
    
    <!-- Starting Word (only show before first word entered) -->
    <Transition name="starting-word-collapse">
      <StartingWord v-if="!hasStartedPlaying" :word="startingWord" />
    </Transition>
    
    <!-- Latest word display - positioned right below header like starting word was -->
    <div 
      v-if="hasStartedPlaying"
      class="fixed top-20 left-0 right-0 px-4 z-30"
    >
      <div class="max-w-lg mx-auto">
        <!-- Chain link coming from header -->
        <div class="chain-connector flex flex-col items-center mb-2">
          <div class="w-0.5 h-4 bg-gradient-to-b from-purple-400/30 to-purple-400 dark:from-cyan-400/30 dark:to-cyan-400 rounded-full"></div>
          <div class="w-2.5 h-2.5 rounded-full border-2 border-purple-400 dark:border-cyan-400 bg-white/80 dark:bg-white/20"></div>
          <div class="w-0.5 h-3 bg-purple-400 dark:bg-cyan-400 rounded-full"></div>
        </div>
        
        <!-- Only the latest word -->
        <div class="relative">
          <TransitionGroup name="chain-yank">
            <WordDisplay 
              v-if="latestWord"
              :key="latestWord.id"
              :word="latestWord.text" 
              :points="latestWord.points"
              :reused-letters="latestWord.reusedLetters"
              :is-latest="true"
              :show-points="latestWord.showPoints"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
    
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

// Track if player has entered first word
const hasStartedPlaying = computed(() => wordChain.value.length > 0)

// Only show the latest word
const latestWord = computed(() => wordChain.value[wordChain.value.length - 1] || null)

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

<style scoped>
/* Starting word collapse animation */
.starting-word-collapse-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.starting-word-collapse-leave-to {
  opacity: 0;
  transform: translateY(-60px) scale(0.8);
}

/* Chain yank animation - word gets pulled up by the chain */
.chain-yank-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chain-yank-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  left: 0;
  right: 0;
}

.chain-yank-enter-from {
  opacity: 0;
  transform: translateY(100px) scale(0.8);
}

.chain-yank-leave-to {
  opacity: 0;
  transform: translateY(-150px) scale(0.6);
}

/* Chain connector styling */
.chain-connector {
  animation: chain-dangle 2s ease-in-out infinite;
}

@keyframes chain-dangle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}
</style>
