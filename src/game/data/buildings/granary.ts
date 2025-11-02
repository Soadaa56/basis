import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'
import { UnlockTypes, type UnlockRequirement } from '@/game/models/Unlockable'

export const Granary: BuildingDefinition = {
  id: BuildingIds.Granary,
  name: 'Granary',
  cost: [
    { resourceId: ResourceIds.Food, amount: 100 },
    { resourceId: ResourceIds.Wood, amount: 50 },
  ] satisfies ResourceCost[],
  costMultiplier: 1.25,
  purchaseEffectText: '+500 Food Storage\n+2% Food Storage',
  flavorText: 'How does the food not go bad in here?',
  info: [
    {
      type: BuildingTypes.ResourceStorage,
      resourceId: ResourceIds.Food,
      flatStorageAmount: 500,
      modifierStorageAmount: 1.02,
    },
  ] satisfies BuildingInfo[],
  unlockRequirements: [
    {
      unlockType: UnlockTypes.BuildingUnlock,
      id: BuildingIds.Farm,
      amount: 1,
    },
  ] satisfies UnlockRequirement[],
}
