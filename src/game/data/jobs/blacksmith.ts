import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const blacksmith: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Research,
      rate: 0.001,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
