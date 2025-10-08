import { ResourceIds } from '@/game/models/Resource'
import type { JobInfo } from '@/game/data/info/jobsInfo'

export const Merchant: JobInfo = {
  unlocked: true,
  output: [
    {
      resource: ResourceIds.Gold,
      rate: 4,
    },
  ],
  input: [
    {
      resource: ResourceIds.Food,
      rate: 5,
    },
  ],
}
