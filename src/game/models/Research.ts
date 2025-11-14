import type { ResourceCost } from './Resource'
import type { researchUnlockable } from './researches/ResearchUnlockable'
import type { BuildingId } from '../data/buildingsId'
import type { ResourceId } from './Resource'
import type { JobId } from './Jobs'
import type { ResearchState } from './researches/ResearchState'

export interface Research extends researchUnlockable {
  id: string
  name: string
  tier: Tier
  cost: ResourceCost[]
  effect: ResearchEffect[]
  state?: ResearchState
  category?: ResearchCategory
  description?: string
}

export const ResearchTypes = {
  BuildingMult: 'buildingMult',
  JobMult: 'jobMult',
  ResourceAddFlat: 'resourceAddFlat',
  ResourceMult: 'resourceMult',
  ResourceStorageAddFlat: 'resourceStorageAddFlat',
  ResourceStorageMult: 'resourceStorageMult',
  UnlockBuilding: 'unlockBuilding',
  UnlockJobResource: 'unlockJobResource',
  UnlockResearchTier: 'unlockResearchTier',
} as const

export type ResearchType = (typeof ResearchTypes)[keyof typeof ResearchTypes]

export const Tiers = {
  Tier0: 0,
  Tier1: 1,
  Tier2: 2,
  Tier3: 3,
} as const

export type Tier = (typeof Tiers)[keyof typeof Tiers]

export type ResearchEffect =
  | { type: typeof ResearchTypes.BuildingMult; targetId: BuildingId; value: number }
  | { type: typeof ResearchTypes.JobMult; targetId: JobId; value: number }
  | { type: typeof ResearchTypes.ResourceAddFlat; targetId: ResourceId; value: number }
  | { type: typeof ResearchTypes.ResourceMult; targetId: ResourceId; value: number }
  | { type: typeof ResearchTypes.ResourceStorageAddFlat; targetId: ResourceId; value: number }
  | { type: typeof ResearchTypes.ResourceStorageMult; targetId: ResourceId; value: number }
  | { type: typeof ResearchTypes.UnlockJobResource; jobId: JobId; resourceId: ResourceId }
  | { type: typeof ResearchTypes.UnlockBuilding; targetId: BuildingId }
  | { type: typeof ResearchTypes.UnlockResearchTier; targetId: Tier }

export const ResearchCategories = {
  Agriculture: 'agriculture',
  Finance: 'finance',
  Minerals: 'minerals',
  Morale: 'morale',
  Research: 'research',
  Storage: 'storage',
} as const

export type ResearchCategory = (typeof ResearchCategories)[keyof typeof ResearchCategories]

export const researchCategoryLabel: Record<ResearchCategory, string> = {
  agriculture: 'Agriculture',
  finance: 'Finance',
  minerals: 'Minerals & Metalworks',
  morale: 'Entertainment & Morale',
  research: 'Research & Development',
  storage: 'Storage',
}
