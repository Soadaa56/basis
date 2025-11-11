import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const gatherer: JobInfo = {
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
  ] satisfies JobOutput[],
}
