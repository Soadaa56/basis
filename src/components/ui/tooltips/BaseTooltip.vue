<script setup lang="ts">
import { ref } from 'vue'

const hover = ref(false)
</script>

<template>
  <div class="tooltip-container" @mouseover="hover = true" @mouseleave="hover = false">
    <slot />
    <div class="tooltip-info" v-if="hover">
      <slot name="tooltip" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltip-container {
  text-align: center;
}

.tooltip-info {
  white-space: pre-wrap;
  position: absolute;
  padding: 0.5rem;
  border: 2px solid black;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-width: 200px;
}
</style>
