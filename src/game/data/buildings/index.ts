import { bakehouse } from '../../data/buildings/bakehouse'
import { farm } from '../../data/buildings/farm'
import { granary } from './granary'
import { hut } from '../../data/buildings/hut'
import { loggingCamp } from '../../data/buildings/loggingCamp'
import { mill } from './mill'
import { mine } from '../../data/buildings/mine'
import { sawmill } from '../../data/buildings/sawmill'
import { storageShed } from './storageShed'
import { well } from '../../data/buildings/Well'
import { wizardTower } from '../../data/buildings/wizardTower'
import type { BuildingId } from '@/game/data/buildingsId'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const buildingDefinitions: Record<BuildingId, BuildingDefinition> = {
  bakehouse: bakehouse,
  blackSmith: {} as BuildingDefinition,
  farm: farm,
  fishingCamp: {} as BuildingDefinition,
  granary: granary,
  hut: hut,
  loggingCamp: loggingCamp,
  market: {} as BuildingDefinition,
  mill: mill,
  mine: mine,
  sawmill: sawmill,
  storageShed: storageShed,
  townHall: {} as BuildingDefinition,
  well: well,
  wizardTower: wizardTower,
  workShop: {} as BuildingDefinition,
}
