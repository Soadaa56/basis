import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/info/jobsInfo'

export const Miner: JobInfo = {
  unlocked: false,
  output: [
    {
      resource: ResourceIds.Copper,
      rate: 0.2,
    },
  ],
}
