import express from 'express'
import { FooController } from './controllers';
import { InMemoryStore } from './stores/in_memory';

function configRoute(app: express.Application) {
  app.use(express.static('public'))
  app.use('/foo', FooController)
  
  InMemoryStore.set("user", 0)
}


const app: express.Application = express();
const port: number | string = process.env.PORT || 3000

configRoute(app)
app.listen(port, () => {
  console.log(`listening and serving on ${port}`)
})