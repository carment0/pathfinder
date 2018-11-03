import { Router, Request, Response } from 'express'
import { Node, findPath } from '../astar'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json')
  const grid: Node[][] = []
  for (let i = 0; i < 100; i++) {
    grid[i] = []
    for (let j = 0; j < 100; j++) {
      grid[i].push(new Node(i, j))
    }
  }

  const cost: number[][] = []
  for (let i = 0; i < 100; i++) {
    cost[i] = []
    for (let j = 0; j < 100; j++) {
      if (j === 0 && i > 5) {
        cost[i].push(20)
      } else {
        cost[i].push(1)
      }
    }
  }
  
  const path: number[][] = findPath(grid, cost, 0, 0, 55, 55)
  res.send({ "steps": path.length, "path": path })
});

export const PathController: Router = router