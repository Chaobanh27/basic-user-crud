import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment.js'


let mongdoDbInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {

  await client.connect()

  mongdoDbInstance = client.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!mongdoDbInstance) throw new Error('Must connect to Database first')
  return mongdoDbInstance
}