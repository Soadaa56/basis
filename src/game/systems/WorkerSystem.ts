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

  assignWorker(job: JobState) {
    job.assignedWorkers++
    this.decrementUnassignedWorkerCount()
  }

  unassignWorker(job: JobState) {
    job.assignedWorkers--
    this.incrementUnassignedWorkerCount()
  }

  assignAllWorkers(job: JobState) {
    const openWorkerSlots = job.MaxJobSlots - job.assignedWorkers

    if (this.unassignedWorkerCount >= openWorkerSlots) {
      this.unassignedWorkerCount = -openWorkerSlots
    } else {
      job.assignedWorkers += this.unassignedWorkerCount
      this.unassignedWorkerCount = 0
    }
  }
}
