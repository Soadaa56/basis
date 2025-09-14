import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Farmer: JobInfo = {
  unlocked: true,
  output: [
    {
      resource: ResourceIds.Food,
      rate: 3,
    },
  ],
}
