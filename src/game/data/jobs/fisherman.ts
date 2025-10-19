import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Fishermen: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 10,
      multipliers: [],
    },
  ],
  inputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
      multipliers: [],
    },
  ],
}
