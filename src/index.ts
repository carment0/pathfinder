import express from 'express'
import expressWS from 'express-ws'
import bodyParser from 'body-parser'
import { PathController, GridController, CostWebSocketHandler } from './controllers';
import { InMemoryStore } from './stores/in_memory';

function withRoute(app): expressWS.Application {
  expressWS(app)
  console.log(app.ws)
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.ws('/api/costs', CostWebSocketHandler)
  app.use('/api/grids', GridController)
  app.use('/api/paths', PathController)
  return app
}

const app: expressWS.Application = withRoute(express());
const port: number | string = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening and serving on ${port}`)
})