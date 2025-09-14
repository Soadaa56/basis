import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export const BuildingTypes = {
  ResourceProducer: 'resourceProducer',
  ResourceMultiplier: 'resourceMultiplier',
  JobProducer: 'jobProducer',
  WorkerProducer: 'workerProducer',
  Unlocker: 'unlocker',
  Hybrid: 'hybrid',
} as const

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes]

export type BuildingInfo =
  | {
      type: typeof BuildingTypes.ResourceProducer
      resource: ResourceId
      rate: number
      consume?: {
        resource: ResourceId
        rate: number // Should this be rate as well? or purposely different?
      }
    }
  | {
      type: typeof BuildingTypes.ResourceMultiplier
      resource: ResourceId
      multiplier: number
    }
  | {
      type: typeof BuildingTypes.JobProducer
      jobType: JobId
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
  // Idea of a hybrid building seems cool, but not sure  it will make things messy
  // or if in gameplay each building should really just have one purpose
  | {
      type: typeof BuildingTypes.Hybrid
      resource?: ResourceId
      rate?: number
      consume?: {
        resource: ResourceId
        rate: number // Should this be rate as well? or purposely different?
      }
      multiplier?: number
      jobType?: JobId
      addOpenJobs?: number
      addWorkers?: number
      unlocks?: string // will be changed for type safety
    }
