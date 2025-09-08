<script setup lang="ts">
import { loadSaveFile } from '@/utils/saveFile'

const currentSaveFile = loadSaveFile()
const villageName = currentSaveFile?.villageName
</script>

<template>
  <h1 class="village-name-header">{{ villageName }}</h1>
  <p>Test</p>
</template>

<style scoped>
.village-name-header {
  text-align: center;
}
</style>
