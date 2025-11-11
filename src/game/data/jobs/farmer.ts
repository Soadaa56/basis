import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const farmer: JobInfo = {
  unlocked: true,
  outputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
