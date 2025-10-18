import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export const BuildingTypes = {
  ResourceProducer: 'resourceProducer',
  ResourceMultiplier: 'resourceMultiplier',
  ResourceStorage: 'resourceStorage',
  JobMultiplier: 'jobMultiplier',
  JobProducer: 'jobProducer',
  WorkerProducer: 'workerProducer',
  Unlocker: 'unlocker',
} as const

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes]

export type BuildingInfo =
  | {
      type: typeof BuildingTypes.ResourceProducer
      resourceId: ResourceId
      rate: number
      consume?: {
        resourceId: ResourceId
        rate: number
      }
    }
  | {
      type: typeof BuildingTypes.ResourceMultiplier
      resourceId: ResourceId
      multiplier: number
    }
  | {
      type: typeof BuildingTypes.ResourceStorage
      resourceId: ResourceId
      flatStorageAmount?: number
      modifierStorageAmount?: number
    }
  | {
      type: typeof BuildingTypes.JobMultiplier
      jobId: JobId
      multiplier: number
    }
  | {
      type: typeof BuildingTypes.JobProducer
      jobId: JobId
      addOpenJobs: number
    }
  | {
      type: typeof BuildingTypes.WorkerProducer
      addWorkers: number
    }
  | {
      type: typeof BuildingTypes.Unlocker
      unlocks: string // will be changed for type safety
    }
