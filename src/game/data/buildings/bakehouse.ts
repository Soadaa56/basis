import { BuildingIds } from '../buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Bakehouse: BuildingDefinition = {
  id: BuildingIds.Bakehouse,
  name: 'BakeHouse',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 50,
    },
    {
      resourceId: ResourceIds.Wood,
      amount: 50,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.3,
  purchaseEffectText: '+1 Baker',
  flavorText: 'The whaff of freshly baked bread attracts all who wander nearby.',
  info: [
    {
      type: BuildingTypes.JobProducer,
      jobId: JobIds.Baker,
      addOpenJobs: 1,
    },
  ] satisfies BuildingInfo[],
}
