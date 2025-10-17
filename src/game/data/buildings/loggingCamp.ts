import { BuildingTypes, type BuildingInfo } from '@/game/models/buildings/buildingsInfo'
import { JobIds } from '@/game/models/Jobs'

export const LoggingCamp: BuildingInfo = {
  type: BuildingTypes.JobProducer,
  jobType: JobIds.Logger,
  addOpenJobs: 1,
}
