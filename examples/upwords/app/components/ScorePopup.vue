<template>
  <Transition name="float-up">
    <div 
      v-if="visible"
      class="fixed top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-50"
    >
      <div class="px-8 py-4 rounded-2xl font-black text-3xl shadow-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white">
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  visible: boolean
}>()
</script>

<style scoped>
.float-up-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.float-up-leave-active {
  transition: all 0.6s ease-out;
}

.float-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 30px) scale(0.5);
}

.float-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -50px) scale(1.1);
}
</style>
