import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { JobIds } from '@/game/models/Jobs'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'
import { UnlockTypes, type UnlockRequirement } from '@/game/models/Unlockable'

export const Mill: BuildingDefinition = {
  id: BuildingIds.Mill,
  name: 'Mill',
  cost: [
    {
      resourceId: ResourceIds.Food,
      amount: 120,
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
  unlockRequirements: [
    {
      unlockType: UnlockTypes.BuildingUnlock,
      id: BuildingIds.Farm,
      amount: 3,
    },
    {
      unlockType: UnlockTypes.BuildingUnlock,
      id: BuildingIds.Granary,
      amount: 1,
    },
  ] satisfies UnlockRequirement[],
}
