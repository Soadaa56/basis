import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const Gatherer: JobInfo = {
  unlocked: true,
  outputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 1.1,
      multipliers: [],
    },
    {
      resourceId: ResourceIds.Stone,
      rate: 1,
      multipliers: [],
    },
    {
      resourceId: ResourceIds.Gold,
      rate: 0.5,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
