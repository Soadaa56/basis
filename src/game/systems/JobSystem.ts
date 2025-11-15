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

  public get getAllJobs(): Job[] {
    return this.jobs
  }

  getJobById(jobId: JobId): Job {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job) throw new Error(`Could not get job by jobId: ${jobId}.`)
    return job
  }

  doesJobExist(jobId: JobId): boolean {
    return Boolean(this.jobs.find((job) => job.id === jobId))
  }

  // refactor - include jobsDefinitions for inital creation
  createNewJob(jobId: JobId) {
    if (this.doesJobExist(jobId)) return

    const newJob: Job = {
      id: jobId,
      name: jobId.charAt(0).toUpperCase() + jobId.slice(1),
      totalJobs: 0,
      assignedWorkers: 0,
      baseOutputs: [],
    }

    this.jobs.push(newJob)
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number) {
    if (!this.doesJobExist(jobId)) {
      this.createNewJob(jobId)
    }
    const job = this.getJobById(jobId)
    if (!job) throw new Error(`Job ${job} should exist after creation`)

    job.totalJobs += numberOfJobSlots
  }

  // refactor - unsure if this will be a light or heavy rewrite
  // is what I'm doing here is far more complicated than making jobs reactive in vue?
  jobResourceContribution(jobId: JobId) {
    const job = this.getJobById(jobId)
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

  private getJobInfoById(jobId: JobId): JobInfo {
    const jobInfo = jobDefinitions[jobId]
    if (!jobInfo) throw new Error(`Could not get jobInfo with jobId: ${jobId}`)

    return jobInfo
  }
}
