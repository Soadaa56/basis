<script setup lang="ts">
import BaseResourceText from '@/components/ui/BaseResourceText.vue'
</script>

<template>
  <div class="resource-panel-container">
    <h3>Resources Panel</h3>
    <base-resource-text name="gold" :value="0" :max="100" :income="1"></base-resource-text>
    <base-resource-text name="wood" :value="0" :max="100" :income="1"></base-resource-text>
    <base-resource-text name="food" :value="0" :max="100" :income="1"></base-resource-text>
  </div>
</template>

<style scoped>
.resource-panel-container {
  display: flex;
  flex-direction: column;
}
</style>
