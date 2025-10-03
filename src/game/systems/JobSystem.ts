import { jobDefinitions } from '@/game/data/jobs'
import type { JobId } from '@/game/models/Jobs'
import type { Job } from '@/game/models/Jobs'

export interface JobState {
  assignedWorkers: number
  maxJobSlots: number
}

export class JobSystem {
  private jobs: Partial<Record<JobId, JobState>> = {}

  loadJobs(savedJobs: Job[] | Partial<Record<JobId, JobState>>) {
    console.log(savedJobs)
    console.log('hi')
    if (Array.isArray(savedJobs)) {
      savedJobs.forEach((job) => {
        this.jobs[job.id] = {
          assignedWorkers: job.assignedWorkers,
          maxJobSlots: job.totalJobs,
        }
      })
    } else {
      this.jobs = savedJobs
    }
  }

  getAllJobs(): Partial<Record<JobId, JobState>> {
    return this.jobs
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
