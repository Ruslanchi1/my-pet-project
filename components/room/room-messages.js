import { useSession } from "next-auth/react"
import { useRef } from "react"

import classes from './room-messages.module.sass'

const RoomMessages = (props) => {
  const {messages} = props
  const {data: session, status} = useSession()
  const messagesRef = useRef()

  // messagesRef.current.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'start',
  //   inline: 'nearest',
  // })


  const isMyMessage = (authorId) => {
    return authorId === session.user.id ? true : false
  }
  
  return (
    <div className={classes.messages} ref={messagesRef}>
      {messages.map(({ authorId, author, messageId, message }) => (
        <div
          key={messageId}
          className={`${classes['messages__item']} ${
            isMyMessage(authorId) ? classes.my : classes.them
          }`}
        >
          <div className={classes['messages__item-author']}>{author}</div>
          <div className={classes['messages__item-content']}>{message}</div>
        </div>
      ))}
    </div>
  )
}


export default RoomMessages