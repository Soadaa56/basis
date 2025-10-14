<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import BaseBuildingCard from '@/components/ui/BaseBuildingCard.vue'

const gameStore = useGameStore()
</script>

<template>
  <h2>Buildings Panel</h2>
  <BaseBuildingCard
    v-for="building in gameStore.manager.gameState.buildings"
    :key="building.id"
    :id="building.id"
    :name="building.name"
    :cost="building.cost"
    :count="building.count"
    :purchase-effect-text="building.purchaseEffectText"
    :flavor-text="building.flavorText"
  />
</template>

<style scoped></style>
