export class Node {
  public src: Node | null
  public gScore: number
  public i: number
  public j: number

  constructor(i: number, j: number) {
    this.src = null
    this.gScore = Infinity
    this.i = i
    this.j = j    
  }

  public getFScore(ig: number, jg: number): number {
    return this.gScore + this.getHeuristic(ig, jg)
  }

  public isGoal(ig: number, jg: number): boolean {
    return this.i === ig && this.j === jg 
  }

  /**
   * getHeuristic computes heuristic with Manhattan distance.
   * @param ig Short for i_goal
   * @param jg Short for j_goal
   */
  public getHeuristic(ig: number, jg: number): number {
    return Math.abs(ig - this.i) + Math.abs(jg - this.j)
  }
}
  