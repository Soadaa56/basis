import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const farmer: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
    },
  ],
}
