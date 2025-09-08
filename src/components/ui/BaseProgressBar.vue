<script setup lang="ts">
import { ref, onMounted } from 'vue'

const progress = ref(0)

// Proof of concept, would animate based on speed of bar fill, not a flat value
function animateProgress() {
  progress.value += 5
  if (progress.value > 100) {
    clearInterval(intervalId)
  }
}

let intervalId: number

onMounted(() => {
  intervalId = setInterval(animateProgress, 200)
})
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  height: 40px;
  background-color: black;
  border-radius: 5px;
  overflow: hidden;
}
.progress-bar {
  width: 0%;
  height: 100%;
  background-color: green;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}
</style>
