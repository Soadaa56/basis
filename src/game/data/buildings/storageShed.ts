import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'

import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const StorageShed: BuildingDefinition = {
  id: BuildingIds.StorageShed,
  name: 'Storage Shed',
  cost: [
    { resourceId: ResourceIds.Stone, amount: 200 },
    { resourceId: ResourceIds.Wood, amount: 50 },
  ] satisfies ResourceCost[],
  costMultiplier: 1.25,
  purchaseEffectText: '+250 Stone\n+100 Wood\n+20 Copper',
  flavorText: "Stuff isn't organized here, just shoved into a giant pile.",
  info: [
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Stone, flatStorageAmount: 250 },
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Wood, flatStorageAmount: 50 },
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Copper, flatStorageAmount: 20 },
  ] satisfies BuildingInfo[],
}
