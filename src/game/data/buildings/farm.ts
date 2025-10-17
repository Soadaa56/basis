import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { ResourceIds } from '@/game/models/Resource'

export const Farm = {
  id: BuildingIds.Farm,
  name: 'Farm',
  cost: [
    {
      resource: ResourceIds.Food,
      amount: 30,
    },
  ],
  costMultiplier: 1.6,
  purchaseEffectText: '+1 Farmer Job',
  flavorText: 'Seems like a lot of work for 1 person!',
  info: {
    type: BuildingTypes.JobProducer,
    jobType: JobIds.Farmer,
    addOpenJobs: 1,
  } satisfies BuildingInfo,
} // as const // still considering this
