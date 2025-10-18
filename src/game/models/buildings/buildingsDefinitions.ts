import type { BuildingId } from '@/game/data/buildingsId'
import type { BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import type { ResourceCost } from '@/game/models/Resource'

export interface BuildingDefinition {
  id: BuildingId
  name: string
  cost: ResourceCost[]
  costMultiplier: number
  purchaseEffectText: string
  flavorText: string
  info: BuildingInfo
}
