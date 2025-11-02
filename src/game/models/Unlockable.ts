import type { BuildingId } from '../data/buildingsId'

export const UnlockTypes = {
  BuildingUnlock: 'buildingUnlock',
  ResearchUnlock: 'researchUnlock',
  MagicUnlock: 'magicUnlock',
} as const

export type UnlockType = (typeof UnlockTypes)[keyof typeof UnlockTypes]

export type UnlockRequirement = {
  unlockType: UnlockType
  id: BuildingId //| ResearchId | MagicId
  amount: number
}

export interface Unlockable {
  unlockRequirements?: UnlockRequirement[]
}
