import type { ResourceCost } from './Resource'
import type { researchUnlockable } from './researches/ResearchUnlockable'
import type { BuildingId } from '../data/buildingsId'
import type { ResourceId } from './Resource'
import type { JobId } from './Jobs'

export interface Research extends researchUnlockable {
  id: string
  name: string
  tier: number
  researchCost: number
  researchEffect: ResearchEffect[]
  category?: ResearchCategory
  description?: string
  resourceCost?: ResourceCost
}

export const ResearchTypes = {
  BuildingMult: 'buildingMult',
  JobMult: 'jobMult',
  ResourceAddFlat: 'resourceAddFlat',
  ResourceMult: 'resourceMult',
  ResourceStorageAddFlat: 'resourceStorageAddFlat',
  ResourceStorageMult: 'resourceStorageMult',
  UnlockResearch: 'unlockResearch',
  UnlockBuilding: 'unlockBuilding',
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

export interface ResearchEffect {
  researchType: ResearchType
  targetId?: BuildingId | ResourceId | JobId | Tier | string
  value?: number
}

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
