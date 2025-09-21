import { jobDefinitions } from '@/game/data/jobs'
import type { JobId } from '@/game/models/Jobs'

export interface JobState {
  assignedWorkers: number
  MaxJobSlots: number
}

export class JobSystem {
  private jobs: Partial<Record<JobId, JobState>> = {}

  loadJobs(savedJobs: Partial<Record<JobId, JobState>>) {
    this.jobs = savedJobs
  }

  getJobById(jobId: JobId) {
    return this.jobs[jobId]
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
