import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { ResourceIds } from '@/game/models/Resource'

export const Well: BuildingInfo = {
  type: BuildingTypes.ResourceProducer,
  resource: ResourceIds.Water,
  rate: 5,
}
