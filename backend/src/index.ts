import express from 'express'
import * as dotenv from 'dotenv'
import { connectDB } from './database/mongodb'
import { initRoutes } from './config/routes'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

connectDB()
initRoutes(app)

app.listen(process.env.BACKEND_PORT, () => console.log(`Backend sendo executado na porta ${process.env.BACKEND_PORT}`))