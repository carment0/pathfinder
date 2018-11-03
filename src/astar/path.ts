class Node {
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

/**
 * findPath uses A* algorithm
 * @param grid 
 * @param is : Short for i_source or i_start
 * @param js : Short for j_source or j_start
 * @param ig : Short for i_goal
 * @param jg : Short for j_goal
 */
function findPath(grid: Node[][], is: number, js: number, ig: number, jg: number): number[][] {
  const queue: Set<Node> = new Set<Node>()
  const visited: Set<Node> = new Set<Node>()
  grid[is][js].gScore = 0
  
  queue.add(grid[is][js])
  while (queue.size > 0) {
    const current = getMin(queue, ig, jg)
    if (current.isGoal(ig, jg)) {
      return tracePath(current)
    }

    queue.delete(current)
    visited.add(current)
    getNeighbors(grid, current).forEach((neighbor) => {
      if (visited.has(neighbor)) {
        return
      }

      // Let's assume the cost to hop from current to neighbor is 1 without any obstacles
      const tempG: number = current.gScore + 1 
      if (queue.has(neighbor) && neighbor.gScore <= tempG) {
        // Do nothing if neighbor is already in queue and it has better or equivalent g score.
        return
      }

      if (!queue.has(neighbor)) {
        queue.add(neighbor)
      }

      if (neighbor.gScore > tempG) {
        neighbor.src = current
        neighbor.gScore = tempG
      }
    })
  }

  return []
}

// TODO: Use a PriorityQueue map
function getMin(set: Set<Node>, ig: number, jg: number): Node {
  const nodes = Array.from(set.values())
  
  let min: Node = nodes[0]
  let minF: number
  nodes.forEach((node) => {
    if (!min) {
      min = node
      return
    }

    if (node.getFScore(ig, jg) < minF) {
      minF = node.getFScore(ig, jg)
      min = node
    }
  })

  return min
}

function getNeighbors(grid: Node[][], current: Node): Node[] {
  const neighbors: Node[] = []

  // Up
  if (grid[current.i-1][current.j]) {
    neighbors.push(grid[current.i-1][current.j])
  }

  // Down
  if (grid[current.i+1][current.j]) {
    neighbors.push(grid[current.i+1][current.j])
  }

  // Left
  if (grid[current.i][current.j-1]) {
    neighbors.push(grid[current.i][current.j-1])
  }

  // Right
  if (grid[current.i][current.j+1]) {
    neighbors.push(grid[current.i][current.j+1])
  }

  return neighbors
}

function tracePath(node: Node | null): number[][] {
  const path: number[][] = []
  while (node != null) {
    path.push([node.i, node.j])
    node = node.src
  }

  return path
}