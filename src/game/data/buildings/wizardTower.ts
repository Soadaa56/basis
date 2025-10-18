import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '../buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const WizardTower: BuildingDefinition = {
  id: BuildingIds.WizardTower,
  name: 'Wizard Tower',
  cost: [
    { resourceId: ResourceIds.Gold, amount: 1000 },
    { resourceId: ResourceIds.Stone, amount: 2000 },
    { resourceId: ResourceIds.Copper, amount: 500 },
    { resourceId: ResourceIds.Iron, amount: 100 },
    { resourceId: ResourceIds.Water, amount: 10000 },
  ] satisfies ResourceCost[],
  costMultiplier: 10,
  purchaseEffectText: 'Unlocks Magic',
  flavorText: "You'll defintely want to save up for this one!",
  info: [
    {
      type: BuildingTypes.Unlocker,
      unlocks: 'magic tab', // Will be changed to open Magic tab
    },
  ] satisfies BuildingInfo[],
}
