import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const lumberjack: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
    },
  ] satisfies JobOutput[],
}
