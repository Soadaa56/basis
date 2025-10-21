import { JobSystem } from './JobSystem'
import type { Job, JobId } from '@/game/models/Jobs'

export interface WorkerState {
  unassignedWorkerCount: number
  maxWorkerCount: number
}

export class WorkerSystem {
  private jobSystem: JobSystem
  private workerState: WorkerState

  constructor(jobSystem: JobSystem, workerState: WorkerState) {
    this.jobSystem = jobSystem
    this.workerState = workerState
  }

  loadWorkers(workerState: WorkerState) {
    this.workerState = workerState
  }

  incrementUnassignedWorkerCount() {
    if (this.workerState.unassignedWorkerCount < this.workerState.maxWorkerCount) {
      this.workerState.unassignedWorkerCount++
    }
  }

  decrementUnassignedWorkerCount() {
    if (this.workerState.unassignedWorkerCount > 0) {
      this.workerState.unassignedWorkerCount--
    }
  }

  increaseMaxWorkerCount(newWorkers: number) {
    this.workerState.unassignedWorkerCount += newWorkers
    this.workerState.maxWorkerCount += newWorkers
  }

  getWorkerCount(): number {
    return this.workerState.unassignedWorkerCount
  }

  assignWorker(jobId: JobId) {
    const job = this.getJobOrError(jobId)

    if (this.workerState.unassignedWorkerCount > 0 && job.assignedWorkers < job.totalJobs) {
      job.assignedWorkers++
      console.log(job)
      console.log(this.workerState.unassignedWorkerCount)
      this.decrementUnassignedWorkerCount()
    }
  }

  unassignWorker(jobId: JobId) {
    const job = this.getJobOrError(jobId)

    if (job.assignedWorkers > 0) {
      job.assignedWorkers--
      this.incrementUnassignedWorkerCount()
    }
  }

  assignAllWorkers(jobId: JobId) {
    const job = this.getJobOrError(jobId)
    const openWorkerSlots = job.totalJobs - job.assignedWorkers

    if (this.workerState.unassignedWorkerCount >= openWorkerSlots) {
      this.workerState.unassignedWorkerCount -= openWorkerSlots
    } else {
      job.assignedWorkers += this.workerState.unassignedWorkerCount
      this.workerState.unassignedWorkerCount = 0
    }
  }

  unassignAllWorkers(jobId: JobId) {
    const job = this.getJobOrError(jobId)

    this.workerState.unassignedWorkerCount += job.assignedWorkers
    job.assignedWorkers = 0
  }

  private getJobOrError(jobId: JobId): Job {
    const job = this.jobSystem.getJobById(jobId)
    if (!job) {
      throw new Error(`Error at WorkerSystem: job not found: ${jobId}`)
    }
    return job
  }
}
