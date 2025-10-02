import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Beggar: JobInfo = {
  unlocked: true,
  output: [
    {
      resource: ResourceIds.Gold,
      rate: 0.1,
    },
  ],
}
