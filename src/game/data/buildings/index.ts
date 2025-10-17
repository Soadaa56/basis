import { Bakehouse } from '../../data/buildings/bakehouse'
import { Farm } from '../../data/buildings/farm'
import { Hut } from '../../data/buildings/hut'
import { LoggingCamp } from '../../data/buildings/loggingCamp'
import { Mine } from '../../data/buildings/mine'
import { Sawmill } from '../../data/buildings/sawmill'
import { Well } from '../../data/buildings/Well'
import { WizardTower } from '../../data/buildings/wizardTower'

import type { BuildingId } from '@/game/data/buildingsId'
import type { BuildingDefinition } from '@/game/models/buildings/buildingsDefinitions'

export const buildingDefinitions: Partial<Record<BuildingId, BuildingDefinition>> = {
  farm: Farm,
  hut: Hut,
}
