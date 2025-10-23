import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const Miner: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Copper,
      rate: 0.2,
      multipliers: [],
    },
  ] satisfies JobOutput[],
}
