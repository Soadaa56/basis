import { BuildingTypes, type BuildingInfo } from '@/game/data/info/buildingsInfo'
import { ResourceIds } from '@/game/models/Resource'

export const Bakehouse: BuildingInfo = {
  type: BuildingTypes.ResourceMultiplier,
  resource: ResourceIds.Food,
  multiplier: 1.15,
}
