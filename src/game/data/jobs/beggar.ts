import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobOutput } from '@/game/data/jobsInfo'

export const beggar: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 1,
    },
  ] satisfies JobOutput[],
}
