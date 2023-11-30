/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { CONNECT_DB } from './config/mongodb'
import { env } from '~/config/environment.js'
import { API_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { StatusCodes } from 'http-status-codes'

const port = env.APP_PORT
const host = env.APP_HOST

const START_SERVER = () => {
  const app = express()

  app.use(cors())

  app.use(express.json())

  app.use('/v1', API_V1)

  app.use(errorHandlingMiddleware)

  app.use((err, req, res) => {
    console.error(err.stack)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something broke!')
  })

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
  app.listen(port, host, () => {
    console.log(`Hello ChaoBanh, I am running at ${ host }:${ port }/`)
  })
}

(async() => {
  try {
    console.log('1. Connecting to MongoDB CLoud Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas')
    START_SERVER()
  }
  catch (error) {
    console.log(error)
    process.exit(0)
  }
})()


