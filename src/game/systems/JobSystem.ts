import { jobDefinitions } from '@/game/data/jobs'
import type { Job, JobId } from '@/game/models/Jobs'

export class JobSystem {
  private jobs: Job[] = []

  constructor(jobs: Job[]) {
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

  private getJobOrError(jobId: JobId): Job {
    const job = this.getJobById(jobId)
    if (!job) {
      throw new Error(`Error at WorkerSystem: job not found: ${jobId}`)
    }
    return job
  }
}
