import express from 'express'
import expressws from 'express-ws'
import bodyParser from 'body-parser'
import { PathController, GridController, CostWebSocketHandler } from './controllers';
import { InMemoryStore } from './stores/in_memory';

function configRoute(app) {
  expressws(app)
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.ws('/api/costs', CostWebSocketHandler)
  app.use('/api/grids', GridController)
  app.use('/api/paths', PathController)  
}

const app: express.Application = express();
const port: number | string = process.env.PORT || 3000

configRoute(app)
app.listen(port, () => {
  console.log(`listening and serving on ${port}`)
})