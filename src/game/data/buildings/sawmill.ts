import { BuildingTypes, type BuildingInfo } from '@/game/data/buildingsInfo'
import { ResourceIds } from '@/game/models/Resource'

export const Sawmill: BuildingInfo = {
  type: BuildingTypes.ResourceProducer,
  resource: ResourceIds.Plank,
  rate: 1,
  consume: {
    resource: ResourceIds.Wood,
    rate: 2,
  },
}
