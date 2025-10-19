import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Baker: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 3,
      multipliers: [],
    },
  ],
  inputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
      multipliers: [],
    },
  ],
}
