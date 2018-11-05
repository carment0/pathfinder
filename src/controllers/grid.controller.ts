import { Router, Request, Response } from 'express'
import { InMemoryStore } from '../stores/in_memory'
import { Node } from '../astar'
import { outBound } from './helper'

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json');

  const row: number = req.body["row"]
  const col: number = req.body["col"]
  if (row === undefined || col === undefined) {
    res.status(422)
    res.send({error: "row & col are required"})
    return
  }

  const grid: Node[][] = []
  for (let i = 0; i < row; i++) {
    grid[i] = []
    for (let j = 0; j < col; j++) {
      grid[i].push(new Node({i, j}))
    }
  }

  const cost: number[][] = []
  for (let i = 0; i < row; i++) {
    cost[i] = []
    for (let j = 0; j < col; j++) {
      cost[i].push(1)
    }
  }

  InMemoryStore.set("dim", { row, col })
  InMemoryStore.set("grid", grid)
  InMemoryStore.set("cost", cost)
  
  res.status(201)
  res.send({ row, col })
})

export const GridController: Router = router;