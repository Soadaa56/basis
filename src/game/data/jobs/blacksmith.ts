import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const Blacksmith: JobInfo = {
  unlocked: false,
  output: [
    {
      resource: ResourceIds.Research,
      rate: 0.001,
    },
  ],
}
