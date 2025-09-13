export class WorkerSystem {
  workerCount: number
  maxWorkerCount: number
  constructor(workerCount: number = 1, maxWorkerCount: number = 1) {
    this.workerCount = workerCount
    this.maxWorkerCount = maxWorkerCount
  }

  // For Game Resets
  resetWorkerCount(workerCount: number, maxWorkerCount: number) {
    this.workerCount = workerCount
    this.maxWorkerCount = maxWorkerCount
  }

  incrementWorkerCount() {
    this.workerCount++
  }

  decrementWorkerCount() {
    this.workerCount--
  }

  increaseMaxWorkerCount(newWorkers: number) {
    this.workerCount += newWorkers
    this.maxWorkerCount += newWorkers
  }

  getWorkerCount(): number {
    return this.workerCount
  }
}
