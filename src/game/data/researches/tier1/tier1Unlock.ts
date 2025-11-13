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
  cost: 1,
  effect: [
    {
      researchType: ResearchTypes.ResourceAddFlat,
      targetId: ResourceIds.Research,
      value: 1,
    },
    {
      researchType: ResearchTypes.UnlockResearchTier,
      targetId: Tiers.Tier1,
    },
  ] satisfies ResearchEffect[],
  state: ResearchStates.Unlocked,
  category: ResearchCategories.Research,
  description: 'Start thinking about things.',
}
