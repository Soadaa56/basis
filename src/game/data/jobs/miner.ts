import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const miner: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Copper,
      rate: 0.4,
    },
  ] satisfies JobOutput[],
}
