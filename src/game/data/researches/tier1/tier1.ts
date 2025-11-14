import { ResourceIds } from '@/game/models/Resource'
import { ResearchCategories, ResearchTypes, Tiers, type Research } from '@/game/models/Research'
import { UnlockTypes } from '@/game/models/researches/ResearchUnlockable'
import { BuildingIds } from '../../buildingsId'

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
  ],
}
