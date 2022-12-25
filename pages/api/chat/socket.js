import { Server } from 'Socket.IO'
import connectToDatabase from '../../../lib/db'

const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
  } else {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
    const client = await connectToDatabase()
    const db = client.db()
    const messagesCollection = db.collection('messages')



    io.on('connection', (socket) => {

      socket.on('chat message', async (msg) => {
        const insertedMessage = await messagesCollection.insertOne(msg)
        if (insertedMessage) io.emit('new message', {...msg, messageId: insertedMessage.insertedId})
      })

      io.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  }

  res.end()
}

export default SocketHandler
