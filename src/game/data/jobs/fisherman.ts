import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/info/jobsInfo'

export const Fishermen: JobInfo = {
  unlocked: false,
  output: [
    {
      resource: ResourceIds.Food,
      rate: 10,
    },
  ],
  input: [
    {
      resource: ResourceIds.Wood,
      rate: 1,
    },
  ],
}
