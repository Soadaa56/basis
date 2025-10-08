import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Fishermen: JobInfo = {
  unlocked: false,
  output: [
    {
      resourceId: ResourceIds.Food,
      rate: 10,
      multipliers: [],
    },
  ],
  input: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
      multipliers: [],
    },
  ],
}
