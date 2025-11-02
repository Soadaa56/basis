import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Farm: BuildingDefinition = {
  id: BuildingIds.Farm,
  name: 'Farm',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 30,
    },
    {
      resourceId: ResourceIds.Gold,
      amount: 20,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.25,
  purchaseEffectText: '+1 Farmer Job',
  flavorText: 'Seems like a lot of work for 1 person!',
  info: [
    {
      type: BuildingTypes.JobProducer,
      jobId: JobIds.Farmer,
      addOpenJobs: 1,
    },
  ] satisfies BuildingInfo[],
} // as const // still considering this
