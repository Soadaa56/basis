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

  increaseWorkerCount(number: number) {
    for (let i = 0; i < number; i++) {
      this.workerCount++
    }
  }

  getWorkerCount(): number {
    return this.workerCount
  }
}
