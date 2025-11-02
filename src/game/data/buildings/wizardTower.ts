import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '../buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const WizardTower: BuildingDefinition = {
  id: BuildingIds.WizardTower,
  name: 'Wizard Tower',
  cost: [
    { resourceId: ResourceIds.Food, amount: 2000 },
    { resourceId: ResourceIds.Gold, amount: 1000 },
    { resourceId: ResourceIds.Stone, amount: 1000 },
    { resourceId: ResourceIds.Copper, amount: 300 },
    { resourceId: ResourceIds.Iron, amount: 100 },
    { resourceId: ResourceIds.Water, amount: 10000 },
  ] satisfies ResourceCost[],
  costMultiplier: 3,
  purchaseEffectText: 'Unlocks Magic',
  flavorText: "You'll defintely want to save up for this one!",
  info: [
    {
      type: BuildingTypes.Unlocker,
      unlocks: 'magic tab', // Will be changed to open Magic tab
    },
  ] satisfies BuildingInfo[],
}
