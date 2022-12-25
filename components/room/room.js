import { useEffect, useRef, useState } from 'react'

import classes from './room.module.sass'
import Loader from '../loader/Loader'

import io from 'Socket.IO-client'
import RoomField from './room-field'
import loadMessages from '../../lib/load-messages'
import RoomMessages from './room-messages'
let socket


const Room = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const loadMessagesFromDatabase = async () => {
      const loadedMessages = await loadMessages()

      setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
      setIsLoading(false)
    }

    const socketInitializer = async () => {
      await fetch('/api/chat/socket')
      socket = io()

      socket.on('connect', () => {
        console.log('connected')
      })

      socket.on('new message', (msg) => {
        console.log('new message event', msg)
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            authorId: msg.authorId,
            author: msg.author,
            messageId: msg.messageId,
            message: msg.message,
          },
        ])
      })
    }

    loadMessagesFromDatabase()
    socketInitializer()
    setIsLoading(false)
  }, [])

  const submitHandler = (msg) => {
    socket.emit('chat message', msg)
  }


  return isLoading ? (
    <Loader />
  ) : (
    <div className={`${classes['room-container']}`}>
      <RoomField enteredMessage={(msg) => submitHandler(msg)} />
      <RoomMessages messages={messages} />
    </div>
  )
}

export default Room
