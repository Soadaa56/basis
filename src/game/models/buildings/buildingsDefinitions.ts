import type { ResourceId } from '@/game/models/Resource'
import type { BuildingId } from '@/game/data/buildingsId'
import type { BuildingInfo } from '@/game/models/buildings/buildingsInfo'

export interface BuildingCost {
  resource: ResourceId
  amount: number
}

export interface BuildingDefinition {
  id: BuildingId
  name: string
  cost: BuildingCost[]
  costMultiplier: number
  purchaseEffectText: string
  flavorText: string
  info: BuildingInfo
}
