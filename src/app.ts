import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { userRoutes } from './app/modules/UserAndOrderManagement/UserAndOrderManagement.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

//applicationroutes
app.use('/api', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
export default app
