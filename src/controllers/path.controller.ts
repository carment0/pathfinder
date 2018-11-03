import { Router, Request, Response } from 'express'
import { Node, findPath } from '../astar'
import { InMemoryStore } from '../stores/in_memory';

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json')
  if (!InMemoryStore.get("map")) {
    res.status(422)
    res.send({error: "please instantiate a map first"})
    return
  }
  
  const map: Node[][] = InMemoryStore.get("map")
  const cost: number[][] = InMemoryStore.get("cost")
  
  if (!InMemoryStore.get("poses")) {
    res.status(422)
    res.send({error: "please create poses first"})
    return
  }

  const poses = InMemoryStore.get("poses")

  // Grid is synonymous to map in this context
  const path: number[][] = findPath(map, cost, poses.is, poses.js, poses.ig, poses.jg)
  res.send({ "steps": path.length, "path": path })
});

export const PathController: Router = router