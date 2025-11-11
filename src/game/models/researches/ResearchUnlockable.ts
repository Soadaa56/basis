import type { BuildingId } from '../../data/buildingsId'
import type { Tier } from '../Research'

export interface researchUnlockable {
  unlockRequirements?: UnlockRequirement[]
}

export type UnlockRequirement = {
  unlockType: UnlockType
  id: BuildingId | Tier | string // researchId
}

export const UnlockTypes = {
  BuildingUnlockRequirement: 'buildingUnlock',
  TierUnlockRequirement: 'tierUnlock',
  ResearchUnlock: 'researchUnlock',
  MagicUnlock: 'magicUnlock',
} as const

export type UnlockType = (typeof UnlockTypes)[keyof typeof UnlockTypes]
