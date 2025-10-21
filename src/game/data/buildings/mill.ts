import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Mill: BuildingDefinition = {
  id: BuildingIds.Mill,
  name: 'Mill',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 80,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.4,
  purchaseEffectText: '+15% Farm Output',
  flavorText: 'Lorem Ipsum.',
  info: [
    {
      type: BuildingTypes.JobMultiplierInput,
      jobId: JobIds.Farmer,
      multiplier: 1.15,
    },
  ] satisfies BuildingInfo[],
}
