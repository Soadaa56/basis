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
/*
Hybrid building idea seems cool and makes sense, seems harder to implement
First, I'm unsure for a gameplay perspective purely if this is a 'good' idea. Make each building have a very specfifc purpose
Second, I can implement this building but just having all the above types with question marks (to make non-mandatory),
which feels wrong? I will consider this more in the future, but focus on MVP and minimal bugs is priority.
*/
