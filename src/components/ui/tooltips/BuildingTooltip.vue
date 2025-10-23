<script setup lang="ts">
import BaseTooltip from './BaseTooltip.vue'
import type { ResourceCost } from '@/game/models/Resource'

const props = defineProps<{
  name: string
  cost: ResourceCost[]
  purchaseEffectText: string
  flavorText?: string
}>()

function formatCost(costs: ResourceCost[]) {
  return costs.map((c) => `${c.amount} ${c.resourceId}`).join(', ')
}

const tooltipText = [props.purchaseEffectText, formatCost(props.cost), props.flavorText ? props.flavorText : null]
  .filter(Boolean)
  .join('\n')
</script>

<template>
  <BaseTooltip :text="tooltipText">
    <slot />
  </BaseTooltip>
</template>

<style scoped lang="scss"></style>
