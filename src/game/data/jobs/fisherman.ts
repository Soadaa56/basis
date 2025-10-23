import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobInput, JobOutput } from '@/game/data/jobsInfo'

export const Fishermen: JobInfo = {
  unlocked: false,
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 10,
      multipliers: [],
    },
  ] satisfies JobOutput[],
  inputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
      multipliers: [],
    },
  ] satisfies JobInput[],
}
