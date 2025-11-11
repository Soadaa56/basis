import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const beggar: JobInfo = {
  unlocked: true,
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 0.1,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
