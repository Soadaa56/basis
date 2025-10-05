import { jobDefinitions } from '@/game/data/jobs'
import type { Job, JobId } from '@/game/models/Jobs'

export class JobSystem {
  private jobs: Job[] = []

  loadJobs(savedJobs: Job[]) {
    this.jobs = savedJobs.map((job) => ({
      ...job,
      assignedWorkers: job.assignedWorkers ?? 0,
      totalJobs: job.totalJobs ?? 0,
      unlocked: job.isUnlocked ?? false,
    }))
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
}
