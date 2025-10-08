import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Merchant: JobInfo = {
  unlocked: true,
  output: [
    {
      resourceId: ResourceIds.Gold,
      rate: 4,
      multipliers: [],
    },
  ],
  input: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
      multipliers: [],
    },
  ],
}
