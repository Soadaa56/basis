<script setup lang="ts">
import TooltipBuilding from './tooltips/TooltipBuilding.vue'
import { useGameStore } from '@/stores/game'
import type { BuildingId } from '@/game/data/buildingsId'
import type { ResourceCost } from '@/game/models/Resource'
import { computed } from 'vue'

const gameStore = useGameStore()

const canAfford = computed(() => gameStore.manager.resourceSystem.canAfford(props.cost))
const canAffordWithCurrentStorage = computed(() =>
  gameStore.manager.resourceSystem.canAffordWithCurrentStorage(props.cost),
)
// function canAffordBuilding(costs: ResourceCost[]): boolean {
//   return gameStore.manager.resourceSystem.canAfford(costs)
// }

// function canAffordBuildingWithCurrentStorage(costs: ResourceCost[]): boolean {
//   return gameStore.manager.resourceSystem.canAffordWithCurrentStorage(costs)
// }

const props = defineProps<{
  id: BuildingId
  name: string
  cost: ResourceCost[]
  count: number
  maxCount?: number
  purchaseEffectText: string
  flavorText?: string
}>()

const emit = defineEmits<{
  (e: 'purchase', buildingId: BuildingId): void
}>()
</script>

<template>
  <tooltip-building
    :id="id"
    :name="name"
    :cost="cost"
    :purchase-effect-text="purchaseEffectText"
    :flavor-text="flavorText"
  >
    <div
      class="building-card"
      :class="{
        affordable: canAfford,
        unaffordable: !canAfford,
        affordableStorage: canAffordWithCurrentStorage,
        unaffordableStorage: !canAffordWithCurrentStorage,
      }"
      @click="emit('purchase', id)"
    >
      <p class="building-name">{{ name }}</p>
      <span class="building-count">{{ count }}</span>
    </div>
  </tooltip-building>
</template>

<style scoped lang="scss">
.building-card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 40px;
  background-color: var(--bg-color);
  color: var(--basic-text-color);
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    filter: brightness(1.11);
    cursor: pointer;
  }
}

.building-name {
  margin: auto;
  font-size: 1.1rem;
}

.building-count {
  position: absolute;
  align-self: flex-end;
  background-color: var(--bg-color);
  filter: brightness(1.5);
  padding: 0.1rem;
}

.affordable {
  transition: 0.3s ease-in;
  background-color: var(--bg-color);
}

.unaffordable {
  transition: 0.3s ease-in;
  background-color: var(--bg-storage-problem-color);
}

.affordableStorage {
  color: var(--basic-text-color);
}

.unaffordableStorage {
  color: var(--cost-problem-color);
}
</style>
