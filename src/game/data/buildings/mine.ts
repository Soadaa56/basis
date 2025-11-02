import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const Mine: BuildingDefinition = {
  id: BuildingIds.Mine,
  name: 'Mine',
  cost: [
    { resourceId: ResourceIds.Gold, amount: 50 },
    {
      resourceId: ResourceIds.Wood,
      amount: 50,
    },
    { resourceId: ResourceIds.Stone, amount: 50 },
  ] satisfies ResourceCost[],
  costMultiplier: 1.28,
  purchaseEffectText: '+1 Miner Job',
  flavorText: "Heigh-ho, it's home from work we go.",
  info: [
    {
      type: BuildingTypes.JobProducer,
      jobId: JobIds.Miner,
      addOpenJobs: 1,
    },
  ] satisfies BuildingInfo[],
}
