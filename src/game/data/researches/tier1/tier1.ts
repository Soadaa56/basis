import { ResourceIds } from '@/game/models/Resource'
import { ResearchCategories, ResearchTypes, Tiers, type Research } from '@/game/models/Research'
import { UnlockTypes } from '@/game/models/researches/ResearchUnlockable'

export const discussions: Research = {
  id: 'discussions',
  name: 'Discussions',
  tier: 1,
  cost: 50,
  effect: [
    {
      researchType: ResearchTypes.ResourceStorageAddFlat,
      targetId: ResourceIds.Research,
      value: 150,
    },
  ],
  category: ResearchCategories.Research,
  description: 'Try words',
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
  cost: 150,
  effect: [
    {
      researchType: ResearchTypes.ResourceStorageAddFlat,
      targetId: ResourceIds.Research,
      value: 500,
    },
  ],
  category: ResearchCategories.Research,
  description: 'Collect your groups knowledge',
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
