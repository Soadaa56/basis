import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Blacksmith: JobInfo = {
  unlocked: false,
  output: [
    {
      resourceId: ResourceIds.Research,
      rate: 0.001,
      multipliers: [],
    },
  ],
}
