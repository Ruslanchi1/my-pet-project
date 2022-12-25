import connectToDatabase from "../../../lib/db"
import { hashPassword } from "../../../lib/hash"

const SingupHandler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    const { name, password } = data

    if (
      !name ||
      name.trim().length < 8 ||
      !password ||
      password.trim().length < 8
    ) {
      res.status(422).json({message: 'Invalid name or password: '})
      return
    }

    const client = await connectToDatabase()
    const db = client.db()

    const existingUser = await db.collection('users').findOne({name})

    if (existingUser) {
      res.status(422).json({message: 'User exists already'})
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    await db.collection('users').insertOne({name, hashedPassword})
    res.status(201).json({message: 'Created user'})

    client.close()
  }
}

export default SingupHandler
