import { useSession } from 'next-auth/react'
import { useRef } from 'react'

import classes from './room-field.module.sass'

const RoomField = (props) => {
  const {data: session, status} = useSession()
  const input = useRef()

  const sendEnteredMessageHandler = () => {
    const inputValue = input.current.value

    if (inputValue.trim()) {
      props.enteredMessage({
        authorId: session.user.id,
        author: session.user.name,
        message: inputValue,
      })

      input.current.value = ''
    }
  }
  return (
    <div className={classes['message-form']}>
      <input
        className={classes['message-input']}
        onKeyUp={(e) => (e.key === 'Enter' ? sendEnteredMessageHandler() : null)}
        placeholder="Type something"
        ref={input}
      />
      <div className={classes['submit-button']} onClick={sendEnteredMessageHandler}>
        &#10148;
      </div>
    </div>
  )
}

export default RoomField
