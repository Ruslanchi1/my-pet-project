import { MongoClient } from 'mongodb'

const connectToDatabase = async () => {
  const client = new MongoClient('mongodb://localhost:27017/chat')
  const connectedClient = await client.connect()

  return connectedClient
}

export default connectToDatabase