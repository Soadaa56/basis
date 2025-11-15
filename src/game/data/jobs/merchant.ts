import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobInput, JobOutput } from '@/game/data/jobsInfo'

export const merchant: JobInfo = {
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 4,
    },
  ] satisfies JobOutput[],
  inputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
    },
  ] satisfies JobInput[],
}
