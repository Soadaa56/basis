import { Bakehouse } from './bakehouse'
import { Farm } from './farm'
import { Hut } from './hut'
import { LoggingCamp } from './loggingCamp'
import { Mine } from './mine'
import { Sawmill } from './sawmill'
import { Well } from './Well'
import { WizardTower } from './wizardTower'

import type { BuildingId } from '@/game/models/Buildings'
import type { BuildingInfo } from '@/game/data/info/buildingsInfo'

export const buildingDefinitions: Partial<Record<BuildingId, BuildingInfo>> = {
  bakehouse: Bakehouse,
  farm: Farm,
  hut: Hut,
  loggingCamp: LoggingCamp,
  mine: Mine,
  sawmill: Sawmill,
  well: Well,
  wizardTower: WizardTower,
}
