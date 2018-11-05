export interface Coordinate {
  i: number
  j: number
}

export class Node {
  public coord: Coordinate
  public src: Node | null
  public gScore: number

  constructor(c: Coordinate) {
    this.src = null
    this.gScore = Infinity
    this.coord = c
  }

  public getFScore(goal: Coordinate): number {
    return this.gScore + this.getHeuristic(goal)
  }

  /**
   * Compares whether this coordinate is equivalent to another coordinate.
   * @param other
   */
  public is(other: Coordinate): boolean {
    return this.coord.i == other.i && this.coord.j === other.j 
  }

  /**
   * getHeuristic computes heuristic with Manhattan distance.
   * @param ig Short for i_goal
   * @param jg Short for j_goal
   */
  public getHeuristic(goal: Coordinate): number {
    return Math.abs(goal.i - this.coord.i) + Math.abs(goal.j - this.coord.j)
  }
}
  