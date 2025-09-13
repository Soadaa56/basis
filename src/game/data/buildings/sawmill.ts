import { BuildingTypes, type BuildingInfo } from '@/game/data/buildingInfo'
import { ResourceIds } from '@/game/models/Resource'

export const Sawmill: BuildingInfo = {
  type: BuildingTypes.ResourceProducer,
  resource: ResourceIds.Plank,
  rate: 1,
  consume: {
    resource: ResourceIds.Wood,
    amount: 2,
  },
}
