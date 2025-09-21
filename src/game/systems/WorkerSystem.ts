import { JobSystem } from './JobSystem'
import type { JobId } from '@/game/models/Jobs'

export class WorkerSystem {
  unassignedWorkerCount: number
  maxWorkerCount: number

  constructor(
    private jobSystem: JobSystem,
    unassignedworkerCount: number = 1,
    maxWorkerCount: number = 1,
  ) {
    this.unassignedWorkerCount = unassignedworkerCount
    this.maxWorkerCount = maxWorkerCount
  }

  loadWorkers(unassignedWorkerCount: number, maxWorkerCount: number) {
    this.unassignedWorkerCount = unassignedWorkerCount
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

  assignWorker(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: assignWorker: Job: ${job}`)
    job.assignedWorkers++
    this.decrementUnassignedWorkerCount()
  }

  unassignWorker(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: unassignWorker: Job: ${job}`)
    job.assignedWorkers--
    this.incrementUnassignedWorkerCount()
  }

  assignAllWorkers(jobId: JobId) {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) return console.log(`Error at WorkerSystem: assignAllWorkers: Job: ${job}`)
    const openWorkerSlots = job.MaxJobSlots - job.assignedWorkers

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
