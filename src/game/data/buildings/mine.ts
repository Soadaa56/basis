import { BuildingTypes, type BuildingInfo } from '../buildingsInfo'
import { JobIds } from '@/game/models/Jobs'

export const Mine: BuildingInfo = {
  type: BuildingTypes.JobProducer,
  jobType: JobIds.Miner,
  addOpenJobs: 1,
}
