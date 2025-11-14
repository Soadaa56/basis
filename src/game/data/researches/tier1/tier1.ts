import { ResourceIds, type ResourceCost } from '@/game/models/Resource'
import { UnlockTypes } from '@/game/models/researches/ResearchUnlockable'
import { BuildingIds } from '../../buildingsId'
import { ResearchCategories, ResearchTypes, Tiers, type Research } from '@/game/models/Research'
import type { ResearchEffect } from '@/game/models/Research'
import type { UnlockRequirement } from '@/game/models/researches/ResearchUnlockable'

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

export const pascalName: Research = {
  id: 'pascalName',
  name: 'pascal Name',
  tier: 1,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 1,
    },
  ] satisfies ResourceCost[],
  effect: [
    {
      type: ResearchTypes.UnlockBuilding,
      targetId: BuildingIds.Granary,
    },
  ] satisfies ResearchEffect[],
  category: ResearchCategories.Research,
  description: 'Description.\nEffect.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
  ] satisfies UnlockRequirement[],
}
