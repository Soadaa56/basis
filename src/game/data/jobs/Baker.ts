import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Baker: JobInfo = {
  unlocked: false,
  output: [
    {
      resourceId: ResourceIds.Gold,
      rate: 3,
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
