import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const lumberjack: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
    },
  ],
}
