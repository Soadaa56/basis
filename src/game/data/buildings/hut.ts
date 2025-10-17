import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { BuildingIds } from '@/game/data/buildingsId'
import { ResourceIds } from '@/game/models/Resource'

export const Hut = {
  id: BuildingIds.Hut,
  name: 'Hut',
  cost: [
    {
      resource: ResourceIds.Food,
      amount: 20,
    },
    {
      resource: ResourceIds.Gold,
      amount: 15,
    },
  ],
  costMultiplier: 1.2,
  purchaseEffectText: '+1 Worker',
  flavorText: 'Better than nothing',
  info: {
    type: BuildingTypes.WorkerProducer,
    addWorkers: 1,
  } satisfies BuildingInfo,
} // as const // still considering this
