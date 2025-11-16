import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const blacksmith: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Knowledge,
      rate: 0.5,
    },
  ],
}
