import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/jobsInfo'

export const miner: JobInfo = {
  baseOutputs: [
    {
      resourceId: ResourceIds.Copper,
      rate: 0.4,
    },
  ],
}
