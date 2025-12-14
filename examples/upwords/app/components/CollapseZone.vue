<template>
  <div 
    v-if="hiddenCount > 0"
    class="flex items-center justify-center py-2"
  >
    <div class="flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
      <div class="flex -space-x-1">
        <div v-for="i in Math.min(hiddenCount, 3)" :key="i" class="w-2 h-2 rounded-full bg-white/60" />
      </div>
      <span class="text-white/90 text-sm font-medium">
        +{{ hiddenCount }} more
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hiddenCount: number
}>()
</script>
