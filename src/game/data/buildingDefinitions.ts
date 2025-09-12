import type { BuildingId } from '@/game/models/Buildings'
import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export const BuildingTypes = {
  ResourceProducer: 'resourceProducer',
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
  | {
      type: typeof BuildingTypes.Hybrid
      resource?: ResourceId
      rate?: number
      jobType?: JobId
      addOpenJobs?: number
      addWorkers?: number
      unlocks?: string // will be changed for type safety
    }

export const buildingDefinitions: Partial<Record<BuildingId, BuildingInfo>> = {}
