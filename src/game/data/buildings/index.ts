import { Bakehouse } from '../../data/buildings/bakehouse'
import { Farm } from '../../data/buildings/farm'
import { Granery } from './granery'
import { Hut } from '../../data/buildings/hut'
import { LoggingCamp } from '../../data/buildings/loggingCamp'
import { Mill } from './mill'
import { Mine } from '../../data/buildings/mine'
import { Sawmill } from '../../data/buildings/sawmill'
import { StorageShed } from './storageShed'
import { Well } from '../../data/buildings/Well'
import { WizardTower } from '../../data/buildings/wizardTower'

import type { BuildingId } from '@/game/data/buildingsId'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const buildingDefinitions: Record<BuildingId, BuildingDefinition> = {
  bakehouse: Bakehouse,
  blackSmith: {} as BuildingDefinition,
  farm: Farm,
  fishingCamp: {} as BuildingDefinition,
  granery: Granery,
  hut: Hut,
  loggingCamp: LoggingCamp,
  market: {} as BuildingDefinition,
  mill: Mill,
  mine: Mine,
  sawmill: Sawmill,
  storageShed: StorageShed,
  townHall: {} as BuildingDefinition,
  well: Well,
  wizardTower: WizardTower,
  workShop: {} as BuildingDefinition,
}
