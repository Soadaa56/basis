import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Blacksmith: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Research,
      rate: 0.001,
      multipliers: [],
    },
  ],
}
