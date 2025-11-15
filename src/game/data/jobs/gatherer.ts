import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const gatherer: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 1.1,
    },
  ] satisfies JobOutput[],
}
