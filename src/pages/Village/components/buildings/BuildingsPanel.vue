<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseBuildingCard from '@/components/ui/BaseBuildingCard.vue'

const gameStore = useGameStore()
</script>

<template>
  <h2>Buildings Panel</h2>
  <div class="container">
    <BaseBuildingCard
      v-for="building in gameStore.manager.gameState.buildings"
      :key="building.definition.id"
      :id="building.definition.id"
      :name="building.definition.name"
      :cost="building.getCurrentCost()"
      :count="building.count"
      :purchase-effect-text="building.definition.purchaseEffectText"
      :flavor-text="building.definition.flavorText"
    />
  </div>
</template>

<style scoped></style>
