import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const StorageShed: BuildingDefinition = {
  id: BuildingIds.StorageShed,
  name: 'Storage Shed',
  cost: [
    { resourceId: ResourceIds.Stone, amount: 50 },
    { resourceId: ResourceIds.Wood, amount: 100 },
  ] satisfies ResourceCost[],
  costMultiplier: 1.25,
  purchaseEffectText: '+50 Stone\n+250 Wood\n+30 Copper',
  flavorText: "Stuff isn't organized here, just shoved into a giant pile.",
  info: [
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Stone, flatStorageAmount: 100 },
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Wood, flatStorageAmount: 250 },
    { type: BuildingTypes.ResourceStorage, resourceId: ResourceIds.Copper, flatStorageAmount: 30 },
  ] satisfies BuildingInfo[],
}
