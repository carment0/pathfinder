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
  
  if (!InMemoryStore.get("poses")) {
    res.status(422)
    res.send({error: "please create poses first"})
    return
  }

  const poses = InMemoryStore.get("poses")

  // Grid is synonymous to grid in this context
  const path: number[][] = findPath(grid, cost, poses.is, poses.js, poses.ig, poses.jg)
  res.send({ "steps": path.length, "path": path })
});

export const PathController: Router = router