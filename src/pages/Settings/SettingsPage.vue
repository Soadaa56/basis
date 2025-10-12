<script setup lang="ts">
import FooterLayout from '@/components/layouts/FooterLayout.vue'

// Fast easy way to reset, will be moved and add a confirm
function resetGameData() {
  localStorage.removeItem('saveFile')
  window.location.reload()
}
</script>

<template>
  <h1>Settings</h1>

  <button @click="resetGameData">Reset Game Data</button>

  <footer-layout />
</template>

<style scoped>
button {
  margin: 16px;
  padding: 16px;
  border: 4px dashed darkred;
}
</style>
