import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { BuildingIds } from '../buildingsId'
import { JobIds } from '@/game/models/Jobs'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Sawmill: BuildingDefinition = {
  id: BuildingIds.Sawmill,
  name: 'Sawmill',
  cost: [
    {
      resourceId: ResourceIds.Wood,
      amount: 120,
    },
    {
      resourceId: ResourceIds.Copper,
      amount: 10,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.4,
  purchaseEffectText: '+20% Logger Output',
  flavorText: 'Placeholder text.',
  info: [
    {
      type: BuildingTypes.JobMultiplier,
      jobId: JobIds.Logger,
      multiplier: 1.2,
    },
  ] satisfies BuildingInfo[],
}
