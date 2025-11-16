import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const gatherer: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 1.6,
    },
  ],
}
