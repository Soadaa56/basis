import { BuildingTypes, type BuildingInfo } from '../../models/buildings/buildingsInfo'
import { JobIds } from '@/game/models/Jobs'

export const Mine: BuildingInfo = {
  type: BuildingTypes.JobProducer,
  jobType: JobIds.Miner,
  addOpenJobs: 1,
}
