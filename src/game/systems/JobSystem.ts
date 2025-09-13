import { WorkerSystem } from '@/game/systems/WorkerSystem'

export class JobSystem {
  workerSystem: WorkerSystem

  constructor(workerSystem: WorkerSystem) {
    this.workerSystem = workerSystem
  }
}
