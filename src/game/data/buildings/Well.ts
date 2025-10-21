import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { BuildingIds } from '../buildingsId'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Well: BuildingDefinition = {
  id: BuildingIds.Well,
  name: 'Well',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 250,
    },
    {
      resourceId: ResourceIds.Stone,
      amount: 500,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.35,
  purchaseEffectText: '+1 Water\n+1,000 Water Storage',
  flavorText: 'The second most important resource',
  info: [
    {
      type: BuildingTypes.ResourceProducer,
      resourceId: ResourceIds.Water,
      rate: 1,
    },
    {
      type: BuildingTypes.ResourceStorage,
      resourceId: ResourceIds.Water,
      flatStorageAmount: 1000,
    },
  ] satisfies BuildingInfo[],
}
