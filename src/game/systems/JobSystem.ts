import { jobDefinitions } from '@/game/data/jobs'
import type { Job, JobId } from '@/game/models/Jobs'
import type { ResourceSystem } from './ResourceSystem'
import type { JobInfo } from '../data/jobsInfo'

export class JobSystem {
  private jobs: Job[] = []

  constructor(
    jobs: Job[],
    private resourceSystem: ResourceSystem,
  ) {
    this.jobs = jobs
  }

  loadJobs(jobs: Job[]) {
    console.log(jobs)
    this.jobs = jobs
  }

  getAllJobs() {
    return this.jobs
  }

  getJobById(jobId: JobId) {
    return this.jobs.find((job) => job.id === jobId)
  }

  doesJobExist(jobId: JobId) {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job) return false
    return true
  }

  isJobUnlocked(jobId: JobId) {
    const jobInfo = jobDefinitions[jobId]

    return jobInfo?.unlocked
  }

  unlockJob(jobId: JobId) {
    const jobInfo = this.getJobInfoOrError(jobId)

    jobInfo.unlocked = true
  }

  createNewJob(jobId: JobId) {
    if (this.doesJobExist(jobId)) {
      return
    }

    const newJob: Job = {
      id: jobId,
      name: jobId.charAt(0).toUpperCase() + jobId.slice(1),
      totalJobs: 0,
      assignedWorkers: 0,
      isUnlocked: false,
    }

    this.jobs.push(newJob)
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number) {
    const job = this.getJobOrError(jobId)

    if (!this.isJobUnlocked(jobId)) {
      this.unlockJob(jobId)
    }

    job.totalJobs += numberOfJobSlots
  }

  jobResourceContribution(jobId: JobId) {
    const job = this.getJobOrError(jobId)
    const assignedWorkers = job.assignedWorkers
    const jobInfo = jobDefinitions[jobId]

    if (!jobInfo) return

    // outputs
    jobInfo.outputs?.forEach((output) => {
      const totalMults = (output.multipliers ?? [1]).reduce((sum, value) => sum * value, 1)
      const outputRateWithMults = totalMults * output.rate
      const totalOutput = outputRateWithMults * assignedWorkers

      this.resourceSystem.addJobContribution(output.resourceId, jobId, totalOutput)
    })

    // inputs
    jobInfo.inputs?.forEach((input) => {
      const totalMults = (input.multipliers ?? [1]).reduce((sum, value) => sum * value, 1)
      const inputRateWithMults = totalMults * input.rate
      // negate to simulate a decrease of resources
      const totalInput = inputRateWithMults * assignedWorkers * -1

      this.resourceSystem.addJobContribution(input.resourceId, jobId, totalInput)
    })
  }

  private getJobOrError(jobId: JobId): Job {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error(`Error at WorkerSystem: job not found: ${jobId}`)
    }
    return job
  }

  private getJobInfoOrError(jobId: JobId): JobInfo {
    const jobInfo = jobDefinitions[jobId]
    if (!jobInfo) {
      console.log(`jobId: ${jobId} for jobInfo not found: ${jobInfo}`)
      throw new Error('Error at JobSystem')
    }
    return jobInfo
  }
}
