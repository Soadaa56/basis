import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { BuildingIds } from '../buildingsId'
import { JobIds } from '@/game/models/Jobs'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'
import { UnlockTypes, type UnlockRequirement } from '@/game/models/Unlockable'

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
      type: BuildingTypes.JobMultiplierInput,
      jobId: JobIds.Lumberjack,
      multiplier: 1.2,
    },
  ] satisfies BuildingInfo[],
  unlockRequirements: [
    {
      unlockType: UnlockTypes.BuildingUnlock,
      id: BuildingIds.LoggingCamp,
      amount: 5,
    },
    {
      unlockType: UnlockTypes.BuildingUnlock,
      id: BuildingIds.Mine,
      amount: 1,
    },
  ] satisfies UnlockRequirement[],
}
