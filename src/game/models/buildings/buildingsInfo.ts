import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export const BuildingTypes = {
  ResourceProducer: 'resourceProducer',
  ResourceMultiplier: 'resourceMultiplier',
  JobProducer: 'jobProducer',
  WorkerProducer: 'workerProducer',
  Unlocker: 'unlocker',
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
      // bad variable name?
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
/*
Hybrid building idea seems cool and makes sense, seems harder to implement
First, I'm unsure for a gameplay perspective purely if this is a 'good' idea. Make each building have a very specfifc purpose
Second, I can implement this building but just having all the above types with question marks (to make non-mandatory),
which feels wrong? I will consider this more in the future, but focus on MVP and minimal bugs is priority.
*/
