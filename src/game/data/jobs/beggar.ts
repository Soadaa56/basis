import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const beggar: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 1,
    },
  ],
}
