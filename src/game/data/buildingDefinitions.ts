import type { BuildingId } from '@/game/models/Buildings'
import type { ResourceId } from '@/game/models/Resource'
import type { JobId } from '@/game/models/Jobs'

export const BuildingTypes = {
  JobProducer: 'jobProducer',
  ResourceProducer: 'resourceProducer',
  Unlocker: 'unlocker',
} as const

export type BuildingType = (typeof BuildingTypes)[keyof typeof BuildingTypes]

export type BuildingInfo =
  | {
      type: BuildingType
      resource: ResourceId
      rate: number
    }
  | {
      type: BuildingType
      jobType: JobId
      addOpenJobs: number
    }
  | {
      type: BuildingType
      unlocks: string
    }

export const buildingDefinitions: Partial<Record<BuildingId, BuildingInfo>> = {}
