import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { JobIds } from '@/game/models/Jobs'
import { BuildingIds } from '../buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const LoggingCamp: BuildingDefinition = {
  id: BuildingIds.LoggingCamp,
  name: 'Logging Camp',
  cost: [
    {
      resourceId: ResourceIds.Stone,
      amount: 50,
    },
  ] satisfies ResourceCost[],
  costMultiplier: 1.3,
  purchaseEffectText: '+2 Loggers',
  flavorText: 'Dont forget to edit this.',
  info: [
    {
      type: BuildingTypes.JobProducer,
      jobId: JobIds.Lumberjack,
      addOpenJobs: 2,
    },
  ] satisfies BuildingInfo[],
}
