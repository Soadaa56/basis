import { tier1Unlock } from './tier1/tier1Unlock'
import * as tier1 from './tier1/tier1'
import { tier2Unlock } from './tier2/tier2Unlock'
// import * as tier2 from './tier2/tier2'

import type { Research } from '@/game/models/Research'

export const allResearch: Research[] = [tier1Unlock, ...Object.values(tier1), tier2Unlock]
