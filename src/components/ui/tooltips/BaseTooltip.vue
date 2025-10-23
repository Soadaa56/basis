<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  text: string
}>()
const hover = ref(false)
</script>

<template>
  <div class="tooltip-container" @mouseover="hover = true" @mouseleave="hover = false">
    <slot />
    <div class="tooltip-info" v-if="hover">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltip-container {
  display: inline-block;
  position: relative;
  margin: 1rem;
  text-align: center;
}

.toptip-info {
  position: absolute;
  background-color: white;
  color: black;
}
</style>
