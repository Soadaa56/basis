import { WorkerSystem } from '@/game/systems/WorkerSystem'
import { JobId } from '@/game/data/jobsInfo'

export class JobSystem {
  workerSystem: WorkerSystem

  constructor(workerSystem: WorkerSystem) {
    this.workerSystem = workerSystem
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number) {}
}
