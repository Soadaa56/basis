export class workerSystem {
  workerCount: number
  constructor(workerCount: number = 1) {
    this.workerCount = workerCount
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
