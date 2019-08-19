import * as express from 'express'
import * as bodyParser from 'body-parser'
import { router } from './config/routes'
import { PORT } from './config/environment'

const app: express.Application = express()

app.use(bodyParser.json())

app.use(router)

app.listen(PORT, () => console.log(`Express is listening to port ${PORT}`))
