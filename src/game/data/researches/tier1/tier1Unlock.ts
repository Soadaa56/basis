import { ResourceIds } from '@/game/models/Resource'
import {
  ResearchCategories,
  ResearchTypes,
  Tiers,
  type Research,
  type ResearchEffect,
} from '@/game/models/Research'
import { ResearchStates } from '@/game/models/researches/ResearchState'

export const tier1Unlock: Research = {
  id: 'tier0Unlock',
  name: 'Thinking',
  tier: 0,
  cost: [
    {
      resourceId: ResourceIds.Knowledge,
      amount: 20,
    },
  ],
  effect: [
    {
      type: ResearchTypes.ResourceAddFlat,
      targetId: ResourceIds.Knowledge,
      value: 1,
    },
    {
      type: ResearchTypes.UnlockResearchTier,
      targetId: Tiers.Tier1,
    },
  ] satisfies ResearchEffect[],
  state: ResearchStates.Unlocked,
  category: ResearchCategories.Research,
  description: 'Start thinking about things.\n+1 Research income.',
}
