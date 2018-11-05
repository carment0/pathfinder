import { Node, Coordinate } from './node'

/**
 * findPath uses A* algorithm to seek a path from source to goal.
 * @param grid 2D array that contains row x col many nodes. 
 * @param cost 2D array that contains cost on each coordinate.
 */
export function findPath(grid: Node[][], cost: number[][], start: Coordinate, goal: Coordinate): number[][] {
  const queue: Set<Node> = new Set<Node>()
  const visited: Set<Node> = new Set<Node>()
  grid[start.i][start.j].gScore = 0
  
  queue.add(grid[start.i][start.j])
  while (queue.size > 0) {
    const current = getMin(queue, goal)
    if (current.is(goal)) {
      return tracePath(current)
    }

    queue.delete(current)
    visited.add(current)
    getNeighbors(grid, current).forEach((neighbor) => {
      if (visited.has(neighbor)) {
        return
      }

      // Let's assume the cost to hop from current to neighbor is 1 without any obstacles
      const tempG: number = current.gScore + cost[neighbor.coord.i][neighbor.coord.j]
      // Do nothing if neighbor is already in queue and it has better or equivalent g score.
      if (queue.has(neighbor) && neighbor.gScore <= tempG) {
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
function getMin(set: Set<Node>, goal: Coordinate): Node {
  const nodes = Array.from(set.values())
  
  let min: Node
  let minF: number
  nodes.forEach((node) => {
    if (!min) {
      minF = node.getFScore(goal)
      min = node
      return
    }

    if (node.getFScore(goal) < minF) {
      minF = node.getFScore(goal)
      min = node
    }
  })

  return min
}

function getNeighbors(grid: Node[][], current: Node): Node[] {
  const neighbors: Node[] = []
  
  // Up
  if (grid[current.coord.i-1]) {
    neighbors.push(grid[current.coord.i-1][current.coord.j])
  }

  // Down
  if (grid[current.coord.i+1]) {
    neighbors.push(grid[current.coord.i+1][current.coord.j])
  }

  // Left
  if (grid[current.coord.i][current.coord.j-1]) {
    neighbors.push(grid[current.coord.i][current.coord.j-1])
  }

  // Right
  if (grid[current.coord.i][current.coord.j+1]) {
    neighbors.push(grid[current.coord.i][current.coord.j+1])
  }

  return neighbors
}

function tracePath(node: Node | null): number[][] {
  const path: number[][] = []
  while (node != null) {
    path.push([node.coord.i, node.coord.j])
    node = node.src
  }

  return path
}
