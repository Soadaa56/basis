import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { UnlockTypes } from '@/game/models/researches/ResearchUnlockable'
import { BuildingIds } from '../../buildingsId'
import { ResearchCategories, ResearchTypes, Tiers, type Research } from '@/game/models/Research'
import type { ResearchEffect } from '@/game/models/Research'
import type { UnlockRequirement } from '@/game/models/researches/ResearchUnlockable'
import { JobIds } from '@/game/models/Jobs'

export const discussions: Research = {
  id: 'discussions',
  name: 'Discussions',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 50,
    },
  ],
  effect: [
    {
      type: ResearchTypes.ResourceStorageAddFlat,
      targetId: ResourceIds.Knowledge,
      value: 150,
    },
  ],
  category: ResearchCategories.Research,
  description: 'Try words.\n+150 Research capacity.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
  ],
}

export const poolKnowledge: Research = {
  id: 'poolKnowledge',
  name: 'Pool Knowledge',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 150,
    },
  ],
  effect: [
    {
      type: ResearchTypes.ResourceStorageAddFlat,
      targetId: ResourceIds.Knowledge,
      value: 500,
    },
  ],
  category: ResearchCategories.Research,
  description: 'Collect your groups knowledge.\n+500 Research capacity.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
    {
      unlockType: UnlockTypes.ResearchUnlock,
      id: 'discussions',
    },
  ],
}

export const unlockFarm: Research = {
  id: 'unlockFarm',
  name: 'Unlock Farms',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 50,
    },
    {
      resourceId: ResourceIds.Gold,
      amount: 5,
    },
  ],
  effect: [
    {
      type: ResearchTypes.UnlockBuilding,
      targetId: BuildingIds.Farm,
    },
  ],
  category: ResearchCategories.Agriculture,
  description: 'Start growing food over foraging.\nUnlock the Farm building.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
  ],
}

export const unlockGranary: Research = {
  id: 'unlockGranary',
  name: 'Unlock Granary',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 70,
    },
    {
      resourceId: ResourceIds.Food,
      amount: 50,
    },
  ],
  effect: [
    {
      type: ResearchTypes.UnlockBuilding,
      targetId: BuildingIds.Granary,
    },
  ],
  category: ResearchCategories.Agriculture,
  description: 'Store food away inside.\nUnlock the Granary building.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
    {
      unlockType: UnlockTypes.ResearchUnlock,
      id: 'unlockFarm',
    },
  ],
}

export const unlockGathererStone: Research = {
  id: 'unlockGathererStone',
  name: 'Gather More Stone',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 50,
    },
  ] satisfies ResourceCost[],
  effect: [
    {
      type: ResearchTypes.UnlockJobResource,
      jobId: JobIds.Gatherer,
      resourceId: ResourceIds.Stone,
    },
  ] satisfies ResearchEffect[],
  category: ResearchCategories.Agriculture,
  description:
    'Tell your gatherers to be on the look out for rocks in addition to food.\nGatherers now collect stones.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
  ] satisfies UnlockRequirement[],
}
