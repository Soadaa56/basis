import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const Lumberjack: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
