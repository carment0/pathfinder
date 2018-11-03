import { Router, Request, Response } from 'express'
import { InMemoryStore } from '../stores/in_memory'
import { Node } from '../astar'

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json');

  const row: number = req.body["row"]
  const col: number = req.body["col"]
  if (row === undefined || col === undefined) {
    res.status(422)
    res.send({error: "row & column are required"})
    return
  }

  const grid: Node[][] = []
  for (let i = 0; i < row; i++) {
    grid[i] = []
    for (let j = 0; j < col; j++) {
      grid[i].push(new Node(i, j))
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

router.post('/poses', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json');
  
  if (!InMemoryStore.get("grid")) {
    res.status(422)
    res.send({error: "please instantiate a grid first"})
    return
  }

  const is: number = req.body["i_start"]
  const js: number = req.body["j_start"]
  const ig: number = req.body["i_goal"]
  const jg: number = req.body["j_goal"]
  if (is === undefined || js === undefined || ig === undefined || jg == undefined) {
    res.status(422)
    res.send({error: "indices i_start, j_start, i_goal, and j_goal are required"})
    return
  }

  const dim = InMemoryStore.get("dim")
  if (outBound(is, js, dim.row, dim.col) || outBound(ig, jg, dim.row, dim.col)) {
    res.status(422)
    res.send({error: "indices are out of bound"})
    return
  }

  InMemoryStore.set("poses", { is, js, ig, jg })

  res.status(201)
  res.send({ i_start: is, j_start: js, i_goal: ig, j_goal: jg })
})

function outBound(i: number, j:number, row: number, col: number) {
  return (i < 0 || row <= i) || (j < 0 || col <= j) 
}

router.post("/costs",  (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json');

  if (!InMemoryStore.get("grid")) {
    res.status(422)
    res.send({error: "please instantiate a grid first"})
    return
  }

  const i: number = req.body["i"]
  const j: number = req.body["j"]
  if (i === undefined || j === undefined) {
    res.status(422)
    res.send({error: "indices i and j are required"})
    return
  }

  const dim = InMemoryStore.get("dim")
  if (outBound(i, j, dim.row, dim.col)) {
    res.status(422)
    res.send({error: "indices are out of bound"})
    return
  }

  const cost: number[][] = InMemoryStore.get("cost")
  cost[i][j] = Infinity
  InMemoryStore.set("cost", cost)

  res.status(201)
  res.send({ i, j })
})

export const GridController: Router = router;