import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'

export const WizardTower: BuildingInfo = {
  type: BuildingTypes.Unlocker,
  // will not use string; I want one type of each building for testing
  unlocks: 'Unlocks Wizard Tower; magic menu',
}
