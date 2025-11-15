import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobInput, JobOutput } from '@/game/data/jobsInfo'

export const fishermen: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 10,
    },
  ] satisfies JobOutput[],
  inputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
    },
  ] satisfies JobInput[],
}
