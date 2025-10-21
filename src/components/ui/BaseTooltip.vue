<script setup lang="ts">
import { ref } from 'vue'

// interface Props {
//   text: string
// }

// const props = defineProps<Props>()
const hover = ref(false)
</script>

<template>
  <div class="tooltip-card" @mouseover="hover = true" @mouseleave="hover = false">
    <span>hover me</span>
    <p v-if="hover">Secret</p>
  </div>
</template>

<style scoped lang="scss">
.tooltip-card {
  margin: 1rem;
  text-align: center;
  position: absolute;
}
</style>
