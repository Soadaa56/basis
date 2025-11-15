import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const blacksmith: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Knowledge,
      rate: 0.5,
    },
  ] satisfies JobOutput[],
}
