import express from 'express'
import { RootController } from './controllers';


function configRoute(app: express.Application) {
  app.use(express.static('public'))
  app.use('/', RootController)
}

const app: express.Application = express();
const port: number | string = process.env.PORT || 3000

configRoute(app)
app.listen(port, () => {
  console.log(`listening and serving on ${port}`)
})