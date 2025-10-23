import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo, JobInput, JobOutput } from '@/game/data/jobsInfo'

export const Merchant: JobInfo = {
  unlocked: true,
  outputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 4,
      multipliers: [],
    },
  ] satisfies JobOutput[],
  inputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
      multipliers: [],
    },
  ] satisfies JobInput[],
}
