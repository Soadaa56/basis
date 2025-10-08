import { JobSystem } from './JobSystem'
import type { JobId } from '@/game/models/Jobs'

export interface WorkerState {
  unassignedWorkerCount: number
  maxWorkerCount: number
}

export class WorkerSystem {
  unassignedWorkerCount: number
  maxWorkerCount: number

  constructor(
    private jobSystem: JobSystem,
    workerState: WorkerState,
  ) {
    this.unassignedWorkerCount = workerState.unassignedWorkerCount
    this.maxWorkerCount = workerState.maxWorkerCount
  }

  loadWorkers(workerState: WorkerState) {
    this.unassignedWorkerCount = workerState.unassignedWorkerCount
    this.maxWorkerCount = workerState.maxWorkerCount
  }

  // For Game Resets
  resetWorkerCount(workerState: WorkerState) {
    this.unassignedWorkerCount = workerState.unassignedWorkerCount
    this.maxWorkerCount = workerState.maxWorkerCount
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

  assignWorker(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem => assignWorker => job: ${job}`)
    if (this.unassignedWorkerCount > 0) {
      job.assignedWorkers++
      this.decrementUnassignedWorkerCount()
    }
  }

  unassignWorker(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: unassignWorker: Job: ${job}`)
    if (job.assignedWorkers > 0) {
      job.assignedWorkers--
      this.incrementUnassignedWorkerCount()
    }
  }

  assignAllWorkers(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: assignAllWorkers: Job: ${job}`)
    const openWorkerSlots = job.totalJobs - job.assignedWorkers

    if (this.unassignedWorkerCount >= openWorkerSlots) {
      this.unassignedWorkerCount -= openWorkerSlots
    } else {
      job.assignedWorkers += this.unassignedWorkerCount
      this.unassignedWorkerCount = 0
    }
  }

  unassignAllWorkers(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: unassignAllWorkers: Job: ${job}`)

    this.unassignedWorkerCount += job.assignedWorkers
    job.assignedWorkers = 0
  }
}
