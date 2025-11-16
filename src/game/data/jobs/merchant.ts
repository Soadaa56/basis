import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const merchant: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Gold,
      rate: 7,
    },
  ],
  baseInputs: [
    {
      resourceId: ResourceIds.Food,
      rate: 5,
    },
  ],
}
