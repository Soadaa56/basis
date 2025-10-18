import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Hut: BuildingDefinition = {
  id: BuildingIds.Hut,
  name: 'Hut',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 20,
    },
    {
      resourceId: ResourceIds.Gold,
      amount: 10,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.2,
  purchaseEffectText: '+1 Worker',
  flavorText: 'Better than nothing.',
  info: [
    {
      type: BuildingTypes.WorkerProducer,
      addWorkers: 1,
    },
  ] satisfies BuildingInfo[],
} // as const // still considering this
