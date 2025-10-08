import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Miner: JobInfo = {
  unlocked: false,
  output: [
    {
      resourceId: ResourceIds.Copper,
      rate: 0.2,
      multipliers: [],
    },
  ],
}
