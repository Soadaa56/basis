import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const fishermen: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 10,
    },
  ],
  baseInputs: [
    {
      resourceId: ResourceIds.Wood,
      rate: 1,
    },
  ],
}
