import { Router, Request, Response } from 'express'
import { Node, findPath } from '../astar'
import { InMemoryStore } from '../stores/in_memory';

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json')
  if (!InMemoryStore.get("grid")) {
    res.status(422)
    res.send({error: "please instantiate a grid first"})
    return
  }
  
  const grid: Node[][] = InMemoryStore.get("grid")
  const cost: number[][] = InMemoryStore.get("cost")
  
  if (!InMemoryStore.get("start") || !InMemoryStore.get("goal")) {
    res.status(422)
    res.send({error: "please create start and goal position"})
    return
  }

  const start = InMemoryStore.get("start")
  const goal = InMemoryStore.get("goal")

  // Grid is synonymous to grid in this context
  const path: number[][] = findPath(grid, cost, start, goal)
  res.send({ "steps": path.length, "path": path })
});


type HTTPHandler = (Request, Response) => void

function outBound(i: number, j:number, row: number, col: number) {
  return (i < 0 || row <= i) || (j < 0 || col <= j) 
}

function coordinatePostHandlerFactory(name: string): HTTPHandler {
  return (req: Request, res: Response) => {
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
      res.send({error: "indices i & j are required"})
      return
    }
  
    const dim = InMemoryStore.get("dim")
    if (outBound(i, j, dim.row, dim.col)) {
      res.status(422)
      res.send({error: "indices are out of bound"})
      return
    }
  
    InMemoryStore.set(name, { i, j })
  
    res.status(201)
    res.send({ i, j })
  }
}

router.post('/start', coordinatePostHandlerFactory("start"))
router.post("/goal", coordinatePostHandlerFactory("goal"))

export const PathController: Router = router