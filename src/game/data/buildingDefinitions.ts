import type { BuildingId } from '@/game/models/Buildings'
import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export type BuildingInfo =
  | {
      type: 'resourceProducer'
      resource: ResourceId
      rate: number
    }
  | {
      type: 'jobProducer'
      jobType: JobId
    }
  | {
      type: 'unlocker'
      unlocks: string
    }
