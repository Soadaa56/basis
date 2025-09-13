import { BuildingTypes, type BuildingInfo } from '@/game/data/buildingsInfo'
import { JobIds } from '@/game/models/Jobs'

export const Farm: BuildingInfo = {
  type: BuildingTypes.JobProducer,
  jobType: JobIds.Farmer,
  addOpenJobs: 2,
}
