import type { JobState } from './JobSystem'

export class WorkerSystem {
  unassignedWorkerCount: number
  maxWorkerCount: number
  constructor(workerCount: number = 1, maxWorkerCount: number = 1) {
    this.unassignedWorkerCount = workerCount
    this.maxWorkerCount = maxWorkerCount
  }

  // For Game Resets
  resetWorkerCount(workerCount: number, maxWorkerCount: number) {
    this.unassignedWorkerCount = workerCount
    this.maxWorkerCount = maxWorkerCount
  }

  incrementUnassignedWorkerCount() {
    if (this.unassignedWorkerCount < this.maxWorkerCount) {
      this.unassignedWorkerCount++
    }
  }

  decrementUnassignedWorkerCount() {
    if (this.unassignedWorkerCount > 0) {
      this.unassignedWorkerCount--
    }
  }

  increaseMaxWorkerCount(newWorkers: number) {
    this.unassignedWorkerCount += newWorkers
    this.maxWorkerCount += newWorkers
  }

  getWorkerCount(): number {
    return this.unassignedWorkerCount
  }
}
