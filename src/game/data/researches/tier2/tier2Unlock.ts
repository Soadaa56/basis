import { ResourceIds } from '@/game/models/Resource'
import {
  ResearchCategories,
  ResearchTypes,
  Tiers,
  type Research,
  type ResearchEffect,
} from '@/game/models/Research'
import { UnlockTypes, type UnlockRequirement } from '@/game/models/researches/ResearchUnlockable'

export const tier2Unlock: Research = {
  id: 'tier1Unlock',
  name: 'Smarties',
  tier: 1,
  cost: {
    resourceId: ResourceIds.Research,
    amount: 600,
  },
  effect: [
    {
      researchType: ResearchTypes.ResourceAddFlat,
      targetId: ResourceIds.Research,
      value: 1,
    },
    {
      researchType: ResearchTypes.UnlockResearchTier,
      targetId: Tiers.Tier2,
    },
  ] satisfies ResearchEffect[],
  category: ResearchCategories.Research,
  description: 'Make smart people the thinkers.\n+1 Research income.',
  unlockRequirements: [
    {
      unlockType: UnlockTypes.TierUnlockRequirement,
      id: Tiers.Tier1,
    },
    {
      unlockType: UnlockTypes.ResearchUnlock,
      id: 'poolKnowledge',
    },
  ] satisfies UnlockRequirement[],
}
