import connectToDatabase from "../../../lib/db"

const loadMessages = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase()
    const db = client.db()
  
    const messagesCollection = db.collection('messages')

    const loadedMessages = await messagesCollection.find({}).toArray()
    
    res.status(200).json({data: loadedMessages})
    client.close()
  }
}

export default loadMessages