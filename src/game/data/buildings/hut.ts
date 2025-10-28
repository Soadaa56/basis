import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Hut: BuildingDefinition = {
  id: BuildingIds.Hut,
  name: 'Hut',
  cost: [
    {
      resourceId: ResourceIds.Wood,
      amount: 20,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.25,
  purchaseEffectText: '+1 Worker',
  flavorText: 'Better than nothing.',
  info: [
    {
      type: BuildingTypes.WorkerProducer,
      addWorkers: 1,
    },
  ] satisfies BuildingInfo[],
} // as const // still considering this
