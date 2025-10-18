import { jobDefinitions } from '@/game/data/jobs'
import type { Job, JobId } from '@/game/models/Jobs'
import type { ResourceSystem } from './ResourceSystem'

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

  getJobById(id: JobId) {
    return this.jobs.find((job) => job.id === id)
  }

  isJobUnlocked(jobId: JobId) {
    const jobInfo = jobDefinitions[jobId]

    return jobInfo?.unlocked
  }

  unlockJob(jobId: JobId) {
    const jobInfo = jobDefinitions[jobId]
    if (!jobInfo) {
      return console.log(`Error unlocking job - JobSystem=>unlockJob=>jobInfo${jobInfo}`)
    }
    jobInfo.unlocked = true
  }

  addJobSlots(jobId: JobId, numberOfJobSlots: number) {
    const jobState = this.getJobById(jobId)
    if (!jobState) return console.log(`Error: JobSystem => addMaxJobSlots => jobState: ${jobState}`)

    if (!this.isJobUnlocked(jobId)) {
      this.unlockJob(jobId)
    }

    jobState.assignedWorkers += numberOfJobSlots
  }

  jobResourceContribution(jobId: JobId) {
    const job = this.getJobById(jobId)
    if (!job) return
    const assignedWorkers = job.assignedWorkers
    const jobInfo = jobDefinitions[jobId]

    if (!assignedWorkers || !jobInfo) return

    // outputs
    jobInfo.output?.forEach((output) => {
      const totalMults = (output.multipliers ?? [1]).reduce((sum, value) => sum * value, 1)
      const outputRateWithMults = totalMults * output.rate
      const totalOutput = outputRateWithMults * assignedWorkers

      this.resourceSystem.addJobContribution(output.resourceId, jobId, totalOutput)
    })

    // inputs
    jobInfo.input?.forEach((input) => {
      const totalMults = (input.multipliers ?? [1]).reduce((sum, value) => sum * value, 1)
      const inputRateWithMults = totalMults * input.rate
      // negate to simulate a decrease of resources
      const totalInput = inputRateWithMults * assignedWorkers * -1

      this.resourceSystem.addJobContribution(input.resourceId, jobId, totalInput)
    })
  }

  private getJobOrError(jobId: JobId): Job {
    const job = this.getJobById(jobId)
    if (!job) {
      throw new Error(`Error at WorkerSystem: job not found: ${jobId}`)
    }
    return job
  }
}
