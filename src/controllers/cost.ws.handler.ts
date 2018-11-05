import { Coordinate } from '../astar'
import { InMemoryStore } from '../stores/in_memory'
import { outBound } from './helper'

export const CostWebSocketHandler = (ws) => {
  ws.on('message', (msg) => {
    const c: Coordinate = JSON.parse(msg)
    if (c.i === undefined || c.j === undefined) {
      return
    }

    if (!InMemoryStore.get("grid")) {
      return
    }

    const dim = InMemoryStore.get("dim")
    if (outBound(c.i, c.j, dim.row, dim.col)) {
      return
    }

    const cost: number[][] = InMemoryStore.get("cost")
    cost[c.i][c.j] = Infinity
    InMemoryStore.set("cost", cost)

    ws.send(JSON.stringify({ i: c.i, j: c.j }))
  })
};