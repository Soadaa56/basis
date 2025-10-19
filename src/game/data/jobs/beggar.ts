import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Beggar: JobInfo = {
  unlocked: true,
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 0.1,
      multipliers: [],
    },
  ],
}
